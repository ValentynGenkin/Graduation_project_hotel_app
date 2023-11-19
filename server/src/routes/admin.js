import express from "express";
import {
  registerAdmin,
  login,
  logout,
  getActiveBookingsByRoom,
  getAllRooms,
  getAllUsers,
  getDashboardAccess,
  getAmountForChart,
  getOccupationByMonth,
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
adminRouter.get("/dashboard/rooms", getAdminAccess, getAllRooms);

adminRouter.get("/dashboard/allUsers", getAdminAccess, getAllUsers);

adminRouter.get("/dashboard", getAdminAccess, getDashboardAccess);

adminRouter.get(
  "/sum-daily-cost/:month/:year",
  getAdminAccess,
  getAmountForChart
);
adminRouter.get("/occupation-rate", getAdminAccess, getOccupationByMonth);

export default adminRouter;
