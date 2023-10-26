import asyncHandler from "express-async-handler";
import Room from "../models/Room.js";
import {
  validateAddRoomInput,
  validateEditRoomInput,
} from "../util/input/inputValidator.js";

export const addRoom = asyncHandler(async (req, res, next) => {
  const roomObj = validateAddRoomInput(req, next);

  const room = await Room.create(roomObj);

  return res.status(201).json({
    success: true,
    room: room,
  });
});

export const editRoom = asyncHandler(async (req, res, next) => {
  const { roomId } = req.params;

  const roomObj = validateEditRoomInput(req, next);

  const room = await Room.findOneAndUpdate({ _id: roomId }, roomObj, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    room: room,
  });
});

export const getSingleRoom = asyncHandler(async (req, res) => {
  const room = req.rooms[0];

  return res.status(200).json({
    success: true,
    room: room,
  });
});
