import mongoose from "mongoose";
import BookingDetail from "./BookingDetail.js";

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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

BookingSchema.post("save", async function (doc, next) {
  setTimeout(async () => {
    try {
      const currentTime = new Date();

      const timeDifference =
        (currentTime - new Date(doc.updatedAt)) / (1000 * 60);
      const booking = await Booking.findById(doc._id).select("status");
      if (timeDifference >= 1 && booking.status === "open") {
        doc.bookingDetailIds = [];
        doc.cost = 0;
        await BookingDetail.deleteMany({ bookingId: doc._id });
        await doc.save();
      }
    } catch (error) {
      next(error);
    }
    next();
  }, 1000 * 60 * 1); // This timeout sets a delay of 15 minutes
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
