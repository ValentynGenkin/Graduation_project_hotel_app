import mongoose from "mongoose";
import Booking from "./Booking.js";
import Room from "./Room.js";
import { getDayDifference } from "../util/dateHelper.js";

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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookingDetailSchema.post("save", async function (doc, next) {
  setTimeout(async () => {
    //TODO: handle errors here or transaction?//not sure setTimeOut
    const booking = await Booking.findById(doc.bookingId);
    if (booking.status === "open") {
      await doc.remove();
      const room = await Room.findById(doc.roomId).select("roomPrice");
      const dayDiff = getDayDifference(
        new Date(doc.checkIn),
        new Date(doc.checkOut)
      );
      const removedPrice = dayDiff * parseFloat(room.roomPrice.toString());
      booking.bookingDetails.splice(booking.bookingDetails.indexOf(doc._id), 1);
      booking.cost = (
        parseFloat(booking.cost.toString()) - removedPrice
      ).toString();
      await booking.save();
    }
  }, 1000 * 60 * 15);
  next();
});

const BookingDetail = mongoose.model("BookingDetail", BookingDetailSchema);

export default BookingDetail;
