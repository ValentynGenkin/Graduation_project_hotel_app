import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
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
