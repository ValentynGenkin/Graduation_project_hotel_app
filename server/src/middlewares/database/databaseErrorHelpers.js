import asyncHandler from "express-async-handler";
import {
  isAdminTokenIncluded,
  isTokenIncluded,
  verifyUserToken,
} from "../../util/authorization/auth.js";
import ServerError from "../../util/error/ServerError.js";
import Room from "../../models/Room.js";
import Booking from "../../models/Booking.js";
import { chooseAvailableRoomAggregation } from "../../util/query/roomQueryHelper.js";

export const getCustomerAccess = asyncHandler(async (req, res, next) => {
  //get customer_access_token from cookies
  const token = isTokenIncluded(req);

  if (!token) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }

  //verify customer_access_token
  const customer = verifyUserToken(token);

  if (!customer) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }
  // add customer to request. to use next functions
  req.customer = customer;
  next();
});

export const checkRoomExist = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId ? req.params.roomId : req.body.roomId;

  const room = await Room.findById(roomId);

  if (!room) {
    next(
      new ServerError(`There is not any room with this id. id: ${roomId}`, 404)
    );
  }

  req.room = room;
  next();
});

export const getAdminAccess = asyncHandler(async (req, res, next) => {
  const token = isAdminTokenIncluded(req);

  if (!token) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }

  const admin = verifyUserToken(token);

  if (!admin || admin.role !== "admin") {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }

  req.admin = admin;

  next();
});

export const checkBookingExist = asyncHandler(async (req, res, next) => {
  const guestCustomerId = req.body.guestCustomerId;
  let booking;

  if (guestCustomerId) {
    booking = await Booking.findOne({ guestCustomerId: guestCustomerId });

    if (!booking) {
      booking = await Booking.create({ guestCustomerId: guestCustomerId });
    }
  } else {
    // at this step we create req.customer.id if guestCustomerId is not exist in request.
    await getCustomerAccess(req, res, next);
    booking = await Booking.findOne({ guestCustomerId: req.customer.id });
  }

  req.booking = booking;
  next();
});

export const chooseFirstAvailableRoom = asyncHandler(async (req, res, next) => {
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
