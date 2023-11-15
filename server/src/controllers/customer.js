import asyncHandler from "express-async-handler";
import {
  isTokenIncluded,
  verifyUserToken,
} from "../util/authorization/auth.js";
import Booking from "../models/Booking.js";

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
    populate: {
      path: "roomId",
      model: "Room",
    },
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
