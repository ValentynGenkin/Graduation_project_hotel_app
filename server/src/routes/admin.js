import express from "express";
import {
  registerAdmin,
  login,
  logout,
  getActiveBookingsByRoom,
  getAllRooms,
  getAllUsers,
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
adminRouter.get("/allUsers", getAdminAccess, getAllUsers);

export default adminRouter;
