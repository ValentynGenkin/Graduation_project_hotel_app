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
  const room = req.room;

  return res.status(200).json({
    success: true,
    room: room,
  });
});
export const deleteSingleRoom = asyncHandler(async (req, res) => {
  const room = req.params.roomId;
  await Room.findByIdAndDelete(room);
  return res.status(200).json({
    success: true,
    msg: "room was deleted",
  });
});

export const getRooms = asyncHandler(async (req, res) => {
  const rooms = await req.rooms.exec();
  return res.status(200).json({
    success: true,
    rooms: rooms,
  });
});

export const getFilters = asyncHandler(async (req, res) => {
  const roomTypes = await Room.distinct("roomType");
  const facilities = await Room.distinct("facilities");
  const bedCounts = await Room.distinct("bedCount");

  return res.status(200).json({
    success: true,
    filters: { roomTypes, facilities, bedCounts },
  });
});
