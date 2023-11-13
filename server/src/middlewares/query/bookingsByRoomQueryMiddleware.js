import asyncHandler from "express-async-handler";
import Room from "../../models/Room.js";
import { paginationHelper } from "../../util/query/roomQueryHelper.js";
import BookingDetail from "../../models/BookingDetail.js";

export const bookingsByRoomQueryMiddleware = asyncHandler(
  async (req, res, next) => {
    let startDateParts = req.query.startDate.split("/");
    // Assuming the date string is in the format DD/MM/YYYY
    let formattedStartDate = `${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`;
    let startDate = new Date(formattedStartDate);
    let endDateParts = req.query.endDate.split("/");
    // Assuming the date string is in the format DD/MM/YYYY
    let formattedEndDate = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`;
    let endDate = new Date(formattedEndDate);
    if (isNaN(startDate) || isNaN(endDate)) {
      startDate = new Date();
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 15);
    }
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
    });
    req.rooms = rooms;
    req.bookings = bookings;
    req.pagination = paginationResults.pagination;

    next();
  }
);
