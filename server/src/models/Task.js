import mongoose from "mongoose";

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

const Task = mongoose.model("Task", TaskSchema);

export default Task;
