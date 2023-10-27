import express from "express";
import { registerAdmin } from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);

export default adminRouter;
