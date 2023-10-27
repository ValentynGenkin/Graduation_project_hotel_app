import asyncHandler from "express-async-handler";
import Room from "../../models/Room.js";
import { filterRooms } from "../../util/query/roomQueryHelper.js";

export const roomQueryMiddleware = asyncHandler(async (req, res, next) => {
  // create filterStages array by user req.query
  const filterStages = filterRooms(req);
  // we group same rooms here.
  const groupingStage = {
    $group: {
      _id: {
        roomType: "$roomType",
        bedCount: "$bedCount",
        facilities: "$facilities",
        roomPrice: "$roomPrice",
      },
      count: { $sum: 1 },
      exampleRoom: { $first: "$$ROOT" },
    },
  };
  //merge differen stages as array
  const aggregationStages = [...filterStages, groupingStage];
  // adding query to req.rooms / we will query it in controller function
  req.rooms = Room.aggregate(aggregationStages);

  next();
});
