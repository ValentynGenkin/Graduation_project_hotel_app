import express from "express";
import {
  getCustomerAccessAndInfo,
  getCustomerCurrentBookings,
  deleteCustomerAccount,
} from "../controllers/customer.js";
import { getCustomerAccess } from "../middlewares/database/databaseErrorHelpers.js";

const customerRouter = express.Router();

customerRouter.get("/auth", getCustomerAccessAndInfo);
customerRouter.get("/bookings", getCustomerAccess, getCustomerCurrentBookings);
customerRouter.delete("/delete", deleteCustomerAccount);

export default customerRouter;
