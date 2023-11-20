import asyncHandler from "express-async-handler";
import {
  isTokenIncluded,
  verifyUserToken,
} from "../util/authorization/auth.js";
import Booking from "../models/Booking.js";
import { comparePassword } from "../util/input/inputValidator.js";
import User from "../models/User.js";
import ServerError from "../util/error/ServerError.js";

export const getCustomerAccessAndInfo = asyncHandler(async (req, res) => {
  const token = isTokenIncluded(req);
  if (!token) {
    return res.status(200).json({
      success: false,
    });
  }
  const customer = verifyUserToken(token);
  if (!customer) {
    return res.status(200).json({
      success: false,
    });
  }
  return res.status(200).json({
    success: true,
    customer: {
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      phone: customer.phone,
      birthday: customer.birthday,
      payment: customer.payment,
      id: customer.id,
    },
  });
});

export const getCustomerCurrentBookings = asyncHandler(async (req, res) => {
  const customerId = req.customer.id;
  const currentDate = new Date();
  const allBookings = await Booking.find({
    customerId: customerId,
    status: { $ne: "open" },
  }).populate({
    path: "bookingDetails",
    populate: [
      {
        path: "roomId",
        model: "Room",
      },
      {
        path: "taskIds",
        model: "Task",
      },
    ],
  });
  let oldBookings = [];
  let currentBookings = [];
  let upComingBookings = [];
  allBookings.forEach((booking) => {
    booking.bookingDetails.forEach((bookingDetail) => {
      const bookingDetailObj = bookingDetail.toObject();
      bookingDetailObj.status = booking.status;

      if (
        bookingDetail.checkIn <= currentDate &&
        bookingDetail.checkOut >= currentDate
      ) {
        currentBookings.push(bookingDetailObj);
      }
      if (bookingDetail.checkOut <= currentDate) {
        oldBookings.push(bookingDetailObj);
      }
      if (bookingDetail.checkIn >= currentDate) {
        upComingBookings.push(bookingDetailObj);
      }
    });
  });

  return res.status(200).json({
    success: true,
    currentBookings: currentBookings,
    oldBookings: oldBookings,
    upComingBookings: upComingBookings,
  });
});

export const deleteCustomerAccount = asyncHandler(async (req, res, next) => {
  const token = isTokenIncluded(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Invalid token or session expired",
    });
  }
  const customer = verifyUserToken(token);
  if (!customer) {
    return res.status(401).json({
      success: false,
      msg: "Invalid token or session expired",
    });
  }

  const { password } = req.body;

  if (!password) {
    return next(new ServerError("Please provide all required inputs", 400));
  }

  const user = await User.findOne({ _id: customer.id }).select("+password");
  if (!comparePassword(password, user.password)) {
    return next(new ServerError("Invalid password.", 401));
  } else {
    await User.deleteOne({ _id: customer.id });
    await Booking.deleteMany({ _id: customer.id });
  }

  return res.status(200).clearCookie("customer_access_token").json({
    success: true,
    msg: "Account and booking history deleted successfully.",
  });
});
