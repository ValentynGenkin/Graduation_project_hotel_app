import asyncHandler from "express-async-handler";
import Room from "../../models/Room.js";
import {
  filterRoomsAggregation,
  generateCombinations,
} from "../../util/query/roomQueryHelper.js";

export const roomQueryMiddleware = asyncHandler(async (req, res, next) => {
  // create filterStages array by user req.query
  const aggregationStages = filterRoomsAggregation(req);

  // adding query to req.rooms / we will query it in controller function
  const allRooms = await Room.aggregate(aggregationStages);

  const { roomCount, personCount } = req.query;
  if (!roomCount || !personCount) {
    req.rooms = allRooms;
    next();
  }
  const rooms = [];
  allRooms.forEach((roomGroup) => {
    const availableRoomCountInGroup =
      roomGroup.count >= roomCount ? parseInt(roomCount) : roomGroup.count;
    for (let i = 0; i < availableRoomCountInGroup; i++) {
      rooms.push(roomGroup);
    }
  });
  const combinationGenerator = generateCombinations(
    rooms,
    parseInt(roomCount),
    parseInt(personCount)
  );
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20; // Number of combinations per page
  const bundleRooms = [];

  let combination;
  let count = 0;
  while (!(combination = combinationGenerator.next()).done) {
    count++;
    if (count > (page - 1) * pageSize && count <= page * pageSize) {
      bundleRooms.push(combination.value);
    }
  }
  // const modifiedBundles = bundleRooms.map((bundle) => {
  //   const modifiedBundle = bundle.reduce((acc, room) => {
  //     const isExist = acc.filter(
  //       (filteredRoom) =>
  //         filteredRoom.room.exampleRoom._id === room.exampleRoom._id
  //     );
  //     if (isExist.length === 0) {
  //       acc.push({ room: room, qt: 1 });
  //       return acc;
  //     } else {
  //       acc.forEach((filteredRoom) => {
  //         if (filteredRoom.room.exampleRoom._id === room.exampleRoom._id) {
  //           filteredRoom.qt += 1;
  //         }
  //       });
  //     }
  //   }, []);
  //   console.log(modifiedBundle);
  //   return modifiedBundle;
  // });
  req.bundleRooms = bundleRooms;
  next();
});
