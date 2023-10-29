import express from "express";
import {
  checkBookingExist,
  checkRoomExist,
  chooseFirstAvailableRoom,
} from "../middlewares/database/databaseErrorHelpers";
import { addRoomToBooking } from "../controllers/booking";

const bookingRouter = express.Router();

bookingRouter.post(
  "/addRoomToBooking",
  [checkBookingExist, checkRoomExist, chooseFirstAvailableRoom],
  addRoomToBooking
);

export default bookingRouter;
