import express from "express";
import { addTask, updateTask } from "../controllers/task.js";
import {
  checkTaskPermission,
  getAdminAccess,
  getCustomerAccess,
} from "../middlewares/database/databaseErrorHelpers.js";

const taskRouter = express.Router();

taskRouter.post("/add", [getCustomerAccess, checkTaskPermission], addTask);
taskRouter.put("/update", getAdminAccess, updateTask);

export default taskRouter;
