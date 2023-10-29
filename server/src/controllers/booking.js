import asyncHandler from "express-async-handler";
import BookingDetail from "../models/BookingDetail.js";
import Booking from "../models/Booking.js";

export const addRoomToBooking = asyncHandler(async (req, res) => {
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  const booking = req.booking;
  const availableRoom = req.availableRoom;

  const bookingDetail = await BookingDetail.create({
    bookingId: booking._id,
    roomId: availableRoom._id,
    checkIn: checkIn,
    checkOut: checkOut,
  });
  booking.bookingDetails.push(bookingDetail._id);
  await booking.save();

  const updatedBooking = await Booking.findById(booking._id).populate(
    "bookingDetails"
  );

  return res.status(200).json({
    success: true,
    booking: updatedBooking,
  });
});
