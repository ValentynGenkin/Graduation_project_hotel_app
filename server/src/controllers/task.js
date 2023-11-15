import asyncHandler from "express-async-handler";
import Task from "../models/Task";
import ServerError from "../util/error/ServerError";

export const addTask = asyncHandler(async (req, res, next) => {
  const { taskMessage } = req.body;
  if (!taskMessage) {
    return next(new ServerError("Please provide a task message!", 400));
  }
  const task = await Task.create({
    bookingId: req.booking._id,
    bookingDetailId: req.bookingDetailId,
    task: taskMessage,
  });
  return res.status(201).json({
    success: true,
    task: task,
  });
});
