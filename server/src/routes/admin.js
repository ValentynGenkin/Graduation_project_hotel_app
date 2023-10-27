import express from "express";
import { addAdmin } from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.post("/add", addAdmin);
