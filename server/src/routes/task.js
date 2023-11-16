import express from "express";
import { addTask } from "../controllers/task.js";
import {
  checkBookingExist,
  checkTaskPermission,
  getCustomerAccess,
} from "../middlewares/database/databaseErrorHelpers.js";

const taskRouter = express.Router();

taskRouter.post(
  "/add",
  [getCustomerAccess, checkBookingExist, checkTaskPermission],
  addTask
);

export default taskRouter;
