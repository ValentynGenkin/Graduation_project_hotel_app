import asyncHandler from "express-async-handler";
import {
  isAdminTokenIncluded,
  isTokenIncluded,
  verifyUserToken,
} from "../../util/authorization/auth.js";
import ServerError from "../../util/error/ServerError.js";
import Room from "../../models/Room.js";
import Booking from "../../models/Booking.js";

import { guestCustomerCheckOutHelper } from "../../util/checkout/guestCustomerCheckOutHelper.js";

export const getCustomerAccess = (req, res, next) => {
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
  if (res === null) {
    return;
  }
  next();
};

export const checkRoomExist = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId ? req.params.roomId : req.body.roomId;
  if (!roomId) {
    next(new ServerError("Please provide a room id.", 400));
  }
  const room = await Room.findById(roomId);

  if (!room) {
    next(
      new ServerError(`There is not any room with this id. id: ${roomId}`, 404)
    );
  }

  req.room = room;

  next();
});

export const getAdminAccess = (req, res, next) => {
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
};

export const checkBookingExist = asyncHandler(async (req, res, next) => {
  const guestCustomerId = req.cookies.guestCustomerId;
  let booking;

  if (guestCustomerId) {
    booking = await Booking.findOne({
      guestCustomerId: guestCustomerId,
      status: "open",
    }).sort({ createdAt: -1 });

    if (!booking) {
      booking = await Booking.create({ guestCustomerId: guestCustomerId });
    }
  } else {
    // at this step we create req.customer.id if guestCustomerId is not exist in request.
    getCustomerAccess(req, null, next);

    if (req.cookies.booking || req.cookies.bookingInProcess) {
      booking = await Booking.findById(
        req.cookies.booking || req.cookies.bookingInProcess
      );
    } else {
      booking = await Booking.findOne({
        customerId: req.customer.id,
        status: "open",
      }).sort({ createdAt: -1 });
    }

    if (!booking && !req.originalUrl.includes("status")) {
      booking = await Booking.create({ customerId: req.customer.id });
    }
  }
  if (req.originalUrl.includes("checkout")) {
    if (parseFloat(booking.cost.toString()) === 0) {
      next(
        new ServerError(
          "You can not go to checkout. Your booking is empty!",
          400
        )
      );
    }
  }
  if (guestCustomerId && req.originalUrl.includes("checkout")) {
    booking = await guestCustomerCheckOutHelper(req, booking, next);
  }
  req.booking = booking;
  next();
});
export const checkTaskPermission = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.body.bookingId).populate(
    "bookingDetails"
  );
  if (req.customer.id !== booking.customerId.toString()) {
    next(
      new ServerError("You can create task for only your own bookings.", 401)
    );
  }
  const { bookingDetailId } = req.body;
  if (!bookingDetailId) {
    next(new ServerError("Please provide a bookingDetailId", 400));
  }

  const bookingDetail = booking.bookingDetails.filter((bookingDetail) => {
    if (bookingDetail._id.toString() === bookingDetailId) {
      return bookingDetail;
    }
  });
  if (bookingDetail.length === 0) {
    next(
      new ServerError(
        "There is no association between provided room id and booking id.",
        400
      )
    );
  }
  if (
    !(
      new Date(bookingDetail[0].checkIn) <= new Date() &&
      new Date(bookingDetail[0].checkOut) >= new Date()
    )
  ) {
    next(
      new ServerError(
        "You can create task only for your current bookings!",
        401
      )
    );
  }
  req.bookingDetail = bookingDetail[0];
  next();
});
