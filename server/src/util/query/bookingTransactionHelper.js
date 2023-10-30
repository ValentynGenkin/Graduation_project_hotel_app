import BookingDetail from "../../models/BookingDetail.js";
import Booking from "../../models/Booking.js";
import mongoose from "mongoose";
import ServerError from "../error/ServerError.js";

export const addRoomToBookingTransaction = async (req, next) => {
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  if (isNaN(checkIn) || isNaN(checkOut) || checkOut < checkIn) {
    next(
      new ServerError(
        "Please provide checkIn - checkOut dates in valid format",
        400
      )
    );
  }
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

    const updatedBooking = Booking.findById(booking._id).populate(
      "bookingDetails"
    );
    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    next(
      new ServerError(
        `Something went wrong during the transaction. Please try again later. - ${error}`,
        error.status
      )
    );
  } finally {
    session.endSession();
  }
};

export const removeRoomFromBookingTransaction = async (req, next) => {
  const { bookingDetailId } = req.body;
  if (!bookingDetailId) {
    next(new ServerError("Please provide a bookingDetailId", 400));
  }
  const room = req.room;
  const booking = req.booking;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const removedBookingDetail = await BookingDetail.findByIdAndDelete(
      bookingDetailId,
      { session }
    );

    if (!removedBookingDetail) {
      await session.abortTransaction();
      session.endSession();
      next(
        new ServerError("Provided Room is not already in your booking.", 400)
      );
    }

    if (removedBookingDetail.roomId.toString() !== room._id.toString()) {
      await session.abortTransaction();
      session.endSession();
      next(
        new ServerError(
          "Provided roomId and bookingDetailId are not associated with each other.",
          400
        )
      );
    }
    booking.bookingDetails.splice(
      booking.bookingDetails.indexOf(bookingDetailId),
      1
    );
    const diffInDays = Math.floor(
      (removedBookingDetail.checkOut - removedBookingDetail.checkIn) /
        (1000 * 60 * 60 * 24)
    );
    booking.cost =
      parseFloat(booking.cost.toString()) -
      parseFloat(room.roomPrice.toString()) * diffInDays;

    await booking.save({ session });

    const updatedBooking = await Booking.findById(booking._id).populate(
      "bookingDetails"
    );

    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    next(
      new ServerError(
        `Something went wrong during the transaction. Please try again later. - ${error}`,
        500
      )
    );
  } finally {
    session.endSession();
  }
};
