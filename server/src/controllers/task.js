import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";
import ServerError from "../util/error/ServerError.js";
import BookingDetail from "../models/BookingDetail.js";

export const addTask = asyncHandler(async (req, res, next) => {
  const { taskMessage, bookingId, bookingDetailId } = req.body;
  if (!taskMessage) {
    return next(new ServerError("Please provide a task message!", 400));
  }

  const task = await Task.create({
    bookingId: bookingId,
    bookingDetailId: bookingDetailId,
    task: taskMessage,
  });
  await BookingDetail.findByIdAndUpdate(task.bookingDetailId, {
    $push: { taskIds: task._id },
  });

  return res.status(201).json({
    success: true,
    task: task,
  });
});
