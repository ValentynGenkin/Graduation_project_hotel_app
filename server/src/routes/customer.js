import express from "express";
import {
  getCustomerAccessAndInfo,
  getCustomerCurrentBookings,
} from "../controllers/customer.js";
import { getCustomerAccess } from "../middlewares/database/databaseErrorHelpers.js";

const customerRouter = express.Router();

customerRouter.get("/auth", getCustomerAccessAndInfo);
customerRouter.get("/bookings", getCustomerAccess, getCustomerCurrentBookings);

export default customerRouter;
