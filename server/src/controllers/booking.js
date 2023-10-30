import asyncHandler from "express-async-handler";
import {
  addRoomToBookingTransaction,
  removeRoomFromBookingTransaction,
} from "../util/query/bookingTransactionHelper.js";

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
    updatedBooking: updatedBooking,
  });
});
