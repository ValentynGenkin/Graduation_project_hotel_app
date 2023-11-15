import express from "express";
import { addTask } from "../controllers/task";
import {
  checkBookingExist,
  checkRoomExist,
  getCustomerAccess,
} from "../middlewares/database/databaseErrorHelpers.js";

const taskRouter = express.Router();

taskRouter.post(
  "/add",
  [getCustomerAccess, checkBookingExist, checkRoomExist],
  addTask
);

export default taskRouter;
