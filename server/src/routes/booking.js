import express from "express";
import {
  checkBookingExist,
  checkRoomExist,
} from "../middlewares/database/databaseErrorHelpers.js";
import { addRoomToBooking } from "../controllers/booking.js";
import { chooseAvailableRoom } from "../middlewares/query/chooseAvailableRoom.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/addRoomToBooking",
  [checkBookingExist, checkRoomExist, chooseAvailableRoom],
  addRoomToBooking
);

export default bookingRouter;
