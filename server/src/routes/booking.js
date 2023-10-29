import express from "express";
import {
  checkBookingExist,
  checkRoomExist,
} from "../middlewares/database/databaseErrorHelpers";
import { addRoomToBooking } from "../controllers/booking";

const bookingRouter = express.Router();

bookingRouter.post(
  "/addRoomToBooking",
  [checkBookingExist, checkRoomExist],
  addRoomToBooking
);

export default bookingRouter;
