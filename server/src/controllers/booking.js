import asyncHandler from "express-async-handler";

export const addRoomToBooking = asyncHandler(async (req, res, next) => {
  const availableRoom = req.availableRoom;

  next(availableRoom);
});
