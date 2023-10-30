import BookingDetail from "../../models/BookingDetail.js";
import Booking from "../../models/Booking.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import ServerError from "../error/ServerError.js";

export const addRoomToBookingTransaction = asyncHandler(async (req, next) => {
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  const booking = req.booking;
  const availableRoom = req.availableRoom;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingDetail = await BookingDetail.create(
      [
        {
          bookingId: booking._id,
          roomId: availableRoom._id,
          checkIn: checkIn,
          checkOut: checkOut,
        },
      ],
      { session }
    );

    booking.bookingDetails.push(bookingDetail[0]._id);
    const diffInDays = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    booking.cost =
      parseFloat(booking.cost.toString()) +
      parseFloat(availableRoom.roomPrice.toString()) * diffInDays;
    await booking.save({ session });

    await session.commitTransaction();

    const updatedBooking = await Booking.findById(booking._id).populate(
      "bookingDetails"
    );
    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    next(
      new ServerError(
        `${error} - Something went wrong during the transaction. Please try again later.`,
        500
      )
    );
  } finally {
    session.endSession();
  }
});
