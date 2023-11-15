import express from "express";
import {
  checkBookingExist,
  checkRoomExist,
  getAdminAccess,
  getCustomerAccess,
} from "../middlewares/database/databaseErrorHelpers.js";
import {
  addRoomToBooking,
  checkout,
  removeRoomFromBooking,
  getBookingStatus,
  inBranchBooking,
  cancelBooking,
  bookingDetailStatus,
  mollieHook,
} from "../controllers/booking.js";
import { chooseAvailableRoom } from "../middlewares/query/chooseAvailableRoom.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/addRoomToBooking",
  [checkBookingExist, checkRoomExist, chooseAvailableRoom],
  addRoomToBooking
);
bookingRouter.post(
  "/removeRoomFromBooking",
  [checkBookingExist, checkRoomExist],
  removeRoomFromBooking
);
bookingRouter.post("/checkout", checkBookingExist, checkout);
bookingRouter.get(
  "/status/:bookingId",
  [getCustomerAccess, checkBookingExist],
  getBookingStatus
);
bookingRouter.post(
  "/in-branch",
  [getAdminAccess, checkRoomExist, chooseAvailableRoom],
  inBranchBooking
);
bookingRouter.get("/cancel/:bookingId", getAdminAccess, cancelBooking);
bookingRouter.get("/bookingDetail/status/:bookingId", bookingDetailStatus);
bookingRouter.post("/mollie-hook", mollieHook);

export default bookingRouter;
