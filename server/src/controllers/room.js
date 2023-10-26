import asyncHandler from "express-async-handler";
import Room from "../models/Room.js";
import { validateAddRoomInput } from "../util/input/inputValidator.js";

export const addRoom = asyncHandler(async (req, res, next) => {
  const roomObj = validateAddRoomInput(req, next);

  const room = await Room.create(roomObj);

  return res.status(201).json({
    success: true,
    room: room,
  });
});
