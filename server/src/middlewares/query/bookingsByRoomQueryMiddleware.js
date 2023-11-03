import Room from "../../models/Room.js";
import { paginationHelper } from "../../util/query/roomQueryHelper.js";

export const bookingsByRoomQueryMiddleware = async (req, res, next) => {
  let startDate = new Date(req.query.startDate);
  let endDate = new Date(req.query.endDate);
  if (isNaN(startDate) || isNaN(endDate)) {
    startDate = new Date();
    endDate = new Date();
    endDate.setDate(startDate.getDate() + 15);
  }
  req.startDate = startDate;
  req.endDate = endDate;

  let query = Room.find({}, { _id: 1, roomNo: 1 });
  query.sort("-roomNo");
  const paginationResults = await paginationHelper(Room, query, req);
  query = paginationResults.query;
  let rooms = await query;
  rooms = rooms.map((room) => room.toObject());

  const roomIds = [];
  rooms.forEach((room) => {
    rooms[rooms.indexOf(room)].bookings = [];
    roomIds.push(room._id);
  });
  req.rooms = rooms;
  req.roomIds = roomIds;
  req.pagination = paginationResults.pagination;

  next();
};
