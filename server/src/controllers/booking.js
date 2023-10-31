import asyncHandler from "express-async-handler";
import {
  addRoomToBookingTransaction,
  removeRoomFromBookingTransaction,
} from "../util/query/bookingTransactionHelper.js";
import { createMolliePayment } from "../util/checkout/createMolliePayment.js";
import ServerError from "../util/error/ServerError.js";

export const addRoomToBooking = asyncHandler(async (req, res, next) => {
  const updatedBooking = await addRoomToBookingTransaction(req, next);

  return res
    .status(200)
    .cookie("booking", updatedBooking, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
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
    .cookie("booking", updatedBooking, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .json({
      success: true,
      updatedBooking: updatedBooking,
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

  return res
    .status(200)
    .cookie("bookingInProgress", booking, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .clearCookie("booking")
    .json({
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
