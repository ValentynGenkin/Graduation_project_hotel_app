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
  const bookings = await Booking.find({
    customerId: customerId,
    status: { $ne: "open" },
  }).populate({
    path: "bookingDetails",
    populate: {
      path: "roomId",
      model: "Room",
    },
  });
  return res.status(200).json({
    success: true,
    bookings: bookings,
  });
});
