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

export const addRoomToBooking = asyncHandler(async (req, res, next) => {
  const updatedBooking = await addRoomToBookingTransaction(req, next);

  return res.status(200).json({
    success: true,
    booking: updatedBooking,
  });
});

export const removeRoomFromBooking = asyncHandler(async (req, res, next) => {
  const updatedBooking = await removeRoomFromBookingTransaction(req, next);

  return res.status(200).json({
    success: true,
    booking: updatedBooking,
  });
});

export const checkout = asyncHandler(async (req, res, next) => {
  let booking = req.booking;
  if (parseFloat(booking.cost.toString()) === 0) {
    return next(
      new ServerError("You can not go to checkout. Your booking is empty!", 400)
    );
  }
  const payment = await createMolliePayment(req);
  booking.status = "pending";
  booking = await booking.save();

  return res.status(200).json({
    success: true,
    redirectUrl: payment._links.checkout.href,
  });
});

export const getBookingStatus = asyncHandler(async (req, res, next) => {
  const booking = req.booking;
  const customer = req.customer;
  if (booking.customerId !== customer.id) {
    return next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }
  if (booking.status === "closed") {
    res.clearCookie("bookingInProgress");
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
