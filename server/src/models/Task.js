import mongoose from "mongoose";
import BookingDetail from "./BookingDetail.js";

const TaskSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Booking",
  },
  bookingDetailId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "BookingDetail",
  },
  task: {
    type: String,
    required: true,
  },
  closingMessage: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "open",
    enum: ["open", "in-process", "closed"],
  },
});
TaskSchema.post("save", async function (doc, next) {
  setTimeout(async () => {
    try {
      await BookingDetail.findByIdAndUpdate(doc.bookingDetailId, {
        $push: { taskIds: doc._id },
      });
    } catch (error) {
      next(error);
    }
  }, 1);
  next();
});
const Task = mongoose.model("Task", TaskSchema);

export default Task;
