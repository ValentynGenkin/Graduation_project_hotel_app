import asyncHandler from "express-async-handler";
import {
  addRoomToBookingTransaction,
  removeRoomFromBookingTransaction,
} from "../util/query/bookingTransactionHelper.js";
import { createMolliePayment } from "../util/checkout/createMolliePayment.js";
import ServerError from "../util/error/ServerError.js";
import { validateUserRegisterInput } from "../util/input/inputValidator.js";
import { v4 } from "uuid";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import sendEmail from "../util/mailer/sendEmail.js";
import {
  inBranchBookingEmail,
  registrationEmail,
} from "../util/mailer/mailTemplates.js";
import { createMollieClient } from "@mollie/api-client";
// import BookingDetail from "../models/BookingDetail.js";
import Task from "../models/Task.js";

export const addRoomToBooking = asyncHandler(async (req, res, next) => {
  const updatedBooking = await addRoomToBookingTransaction(req, next);

  return res
    .status(200)
    .cookie("booking", updatedBooking._id, {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
    })
    .json({
      success: true,
      booking: updatedBooking,
    });
});

export const removeRoomFromBooking = asyncHandler(async (req, res, next) => {
  const updatedBooking = await removeRoomFromBookingTransaction(req, next);

  return res
    .status(200)
    .cookie("booking", updatedBooking._id, {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
    })
    .json({
      success: true,
      booking: updatedBooking,
    });
});

export const checkout = asyncHandler(async (req, res) => {
  let booking = req.booking;

  const payment = await createMolliePayment(req);
  booking.status = "pending";
  booking = await booking.save();
  const updatedBooking = await Booking.findById(booking._id).populate({
    path: "bookingDetails",
    populate: {
      path: "roomId",
      model: "Room",
    },
  });
  if (req.token) {
    res
      .cookie("customer_access_token", req.token)
      .clearCookie("guestCustomerId");
  }

  return res
    .status(200)
    .cookie("bookingInProcess", booking._id)
    .clearCookie("booking")
    .json({
      success: true,
      redirectUrl: payment._links.checkout.href,
      bookingInProcess: updatedBooking,
    });
});

export const getBookingStatus = asyncHandler(async (req, res, next) => {
  const booking = req.booking;
  const customer = req.customer;
  if (!booking) {
    return next(
      new ServerError("You do not have any processing booking.", 404)
    );
  }

  if (booking.customerId.toString() !== customer.id) {
    return next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }
  if (booking.status !== "pending") {
    res.clearCookie("bookingInProcess");
  }

  return res.status(200).json({
    success: true,
    bookingStatus: booking.status,
  });
});

export const inBranchBooking = asyncHandler(async (req, res, next) => {
  req.body.password = v4();
  const userObj = validateUserRegisterInput(req, next);
  let customer = await User.findOne({ email: userObj.email });
  if (!customer) {
    customer = await User.create(userObj);
    const resetPasswordToken = customer.getResetPasswordTokenFromUser();
    await customer.save();
    const resetPasswordUrl = `${process.env.BASE_CLIENT_URL}/customer/resetpassword?reset_password_url=${process.env.BASE_SERVER_URL}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    await sendEmail({
      from: process.env.SMTP_USER,
      to: customer.email,
      subject: "Welcome to Hotel",
      html: registrationEmail(customer.firstname, resetPasswordUrl),
    });
  }

  const booking = await Booking.create({ customerId: customer._id });
  req.booking = booking;

  let updatedBooking = await addRoomToBookingTransaction(req, next);
  updatedBooking.status = "closed";
  await updatedBooking.save();

  updatedBooking = await Booking.findById(booking._id).populate(
    "bookingDetails"
  );

  await sendEmail({
    from: process.env.SMTP_USER,
    to: customer.email,
    subject: "Your Booking Details",
    html: inBranchBookingEmail(customer.firstname, updatedBooking._id),
  });

  return res.status(201).json({
    success: true,
    booking: updatedBooking,
  });
});

export const cancelBooking = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByIdAndUpdate(bookingId, {
    status: "canceled",
  });
  if (!booking) {
    return next(
      new ServerError("There is no booking with provided bookingId", 400)
    );
  }
  booking.status = "canceled";

  await booking.save();

  return res.status(200).json({
    success: true,
    message: "Booking is cancelled successfully.",
  });
});

export const bookingDetailStatus = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  if (bookingId === "no-id") {
    return res.status(200).json({
      success: false,
    });
  }
  const booking = await Booking.findById(bookingId).populate({
    path: "bookingDetails",
    populate: {
      path: "roomId",
      model: "Room",
    },
  });
  if (!booking) {
    return next(
      new ServerError(
        "There is no booking associated with this booking id.",
        404
      )
    );
  }
  return res.status(200).json({
    success: true,
    booking: booking,
  });
});
export const mollieHook = asyncHandler(async (req, res) => {
  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY,
  });
  const payment = await mollieClient.payments.get(req.body.id);

  const booking = await Booking.findById(payment.metadata.booking_id);

  if (
    payment.status === "paid" ||
    payment.status === "failed" ||
    payment.status === "canceled" ||
    payment.status === "expired"
  ) {
    booking.status = payment.status;
    await booking.save();
  }
  return res.status(200).json({ success: true });
});
export const getBookingDetailedTasks = asyncHandler(async (req, res) => {
  let tasksPopulated = await Task.find().populate({
    path: "bookingDetailId",
    populate: {
      path: "roomId",
    },
  });
  // console.log(tasksPopulated);
  return res.status(200).json({ success: true, tasksPopulated });
});
