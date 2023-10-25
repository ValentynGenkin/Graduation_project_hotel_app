import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/auth.js";
import { getCustomerAccess } from "../middlewares/database/databaseErrorHelpers.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.put("/resetpassword", resetPassword);
authRouter.get("/logout", getCustomerAccess, logout);

export default authRouter;
