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
export const updateTask = asyncHandler(async (req, res, next) => {
  const { taskId, taskStatus, updateMessage } = req.body;
  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      status: taskStatus,
      updateMessage: updateMessage,
    },
    { new: true }
  );
  if (!task) {
    next(new ServerError("There is no task associated with this id.", 404));
  }
  return res.status(200).json({ success: true, task: task });
});
