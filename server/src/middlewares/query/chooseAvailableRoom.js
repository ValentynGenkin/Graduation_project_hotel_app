import asyncHandler from "express-async-handler";
import { chooseAvailableRoomAggregation } from "../../util/query/roomQueryHelper.js";
import Room from "../../models/Room.js";
import ServerError from "../../util/error/ServerError.js";

export const chooseAvailableRoom = asyncHandler(async (req, res, next) => {
  const exampleRoom = req.room;
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  const aggregationStages = chooseAvailableRoomAggregation(
    exampleRoom,
    checkIn,
    checkOut
  );
  const availableRoom = await Room.aggregate(aggregationStages);

  if (availableRoom.length === 0) {
    next(
      new ServerError(
        "Currently there is no available room with these criterias",
        400
      )
    );
  }
  req.availableRoom = availableRoom[0];

  next();
});
