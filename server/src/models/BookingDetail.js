import mongoose from "mongoose";

const BookingDetailSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Booking",
  },
  roomId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Room",
  },
  checkIn: { type: Date },
  checkOut: { type: Date },
  taskIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookingDetail = mongoose.model("BookingDetail", BookingDetailSchema);

export default BookingDetail;
