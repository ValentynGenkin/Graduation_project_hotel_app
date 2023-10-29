import express from "express";
import { registerAdmin, login, logout } from "../controllers/admin.js";
import { getAdminAccess } from "../middlewares/database/databaseErrorHelpers.js";

const adminRouter = express.Router();

adminRouter.post("/register", getAdminAccess, registerAdmin);
adminRouter.post("/login", login);
adminRouter.get("/logout", getAdminAccess, logout);

export default adminRouter;
