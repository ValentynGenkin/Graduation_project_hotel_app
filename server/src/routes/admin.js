import express from "express";
import {
  registerAdmin,
  login,
  logout,
  getActiveBookingsByRoom,
} from "../controllers/admin.js";
import { getAdminAccess } from "../middlewares/database/databaseErrorHelpers.js";
import { bookingsByRoomQueryMiddleware } from "../middlewares/query/bookingsByRoomQueryMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/register", getAdminAccess, registerAdmin);
adminRouter.post("/login", login);
adminRouter.get("/logout", getAdminAccess, logout);
adminRouter.get(
  "/dashboard/bookings",
  [getAdminAccess, bookingsByRoomQueryMiddleware],
  getActiveBookingsByRoom
);

export default adminRouter;
