import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    required: false,
    ref: "User",
    default: null,
  },
  guestCustomerId: {
    type: String,
    required: false,
    default: null,
  },
  bookingDetails: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "BookingDetail",
    },
  ],
  cost: {
    type: mongoose.Schema.Types.Decimal128,
    default: mongoose.Types.Decimal128.fromString("0"),
  },
  status: {
    type: String,
    default: "open",
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
