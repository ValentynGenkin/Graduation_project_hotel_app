import express from "express";
import { addTask } from "../controllers/task.js";
import {
  checkTaskPermission,
  getCustomerAccess,
} from "../middlewares/database/databaseErrorHelpers.js";

const taskRouter = express.Router();

taskRouter.post("/add", [getCustomerAccess, checkTaskPermission], addTask);

export default taskRouter;
