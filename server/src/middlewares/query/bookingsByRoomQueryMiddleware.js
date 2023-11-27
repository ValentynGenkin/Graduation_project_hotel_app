import asyncHandler from "express-async-handler";
import Room from "../../models/Room.js";
import { paginationHelper } from "../../util/query/roomQueryHelper.js";
import BookingDetail from "../../models/BookingDetail.js";

export const bookingsByRoomQueryMiddleware = asyncHandler(
  async (req, res, next) => {
    const start = req.query.startDate;
    const [day, month, year] = start.split("/");
    const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const end = req.query.endDate;
    const [dayEnd, monthEnd, yearEnd] = end.split("/");
    const endDate = new Date(`${yearEnd}-${monthEnd}-${dayEnd}T00:00:00.000Z`);
    req.startDate = startDate;
    req.endDate = endDate;
    let query = Room.find({}, { _id: 1, roomNo: 1 });
    query.sort("roomNo");

    const paginationResults = await paginationHelper(Room, query, req);
    query = paginationResults.query;
    let rooms = await query;

    rooms = rooms.map((room) => room.toObject());

    const roomIds = [];
    rooms.forEach((room) => {
      rooms[rooms.indexOf(room)].bookings = [];
      roomIds.push(room._id);
    });
    const bookings = await BookingDetail.find({
      roomId: { $in: roomIds },
      $or: [
        { checkIn: { $lt: startDate }, checkOut: { $gte: startDate } },
        { checkIn: { $gte: startDate, $lte: endDate } },
      ],
    }).populate("taskIds");
    req.rooms = rooms;
    req.bookings = bookings;
    req.pagination = paginationResults.pagination;

    next();
  }
);
