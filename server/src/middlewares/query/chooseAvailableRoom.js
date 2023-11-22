import asyncHandler from "express-async-handler";
import { chooseAvailableRoomAggregation } from "../../util/query/roomQueryHelper.js";
import Room from "../../models/Room.js";
import ServerError from "../../util/error/ServerError.js";

export const chooseAvailableRoom = asyncHandler(async (req, res, next) => {
  const exampleRoom = req.room;
  const bundleRooms = req.bundleRooms;
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  let availableRooms = [];
  if (bundleRooms) {
    for (const bundleRoom of bundleRooms) {
      const aggregationStages = chooseAvailableRoomAggregation(
        bundleRoom,
        checkIn,
        checkOut,
        req.body.roomId
          .split(",")
          .filter((exRoomId) => exRoomId === bundleRoom._id.toString())
          .length || 1
      );
      const rooms = await Room.aggregate(aggregationStages);

      availableRooms = [...availableRooms, ...rooms];
    }

    req.availableBundleRooms = availableRooms;
  } else {
    const aggregationStages = chooseAvailableRoomAggregation(
      exampleRoom,
      checkIn,
      checkOut,
      1
    );
    availableRooms = await Room.aggregate(aggregationStages);
    if (availableRooms.length === 0) {
      next(
        new ServerError(
          "Currently there is no available room with these criterias",
          400
        )
      );
    }
    req.availableRoom = availableRooms[0];
  }

  next();
});
