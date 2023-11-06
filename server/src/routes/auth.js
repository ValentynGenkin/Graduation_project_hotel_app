import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  editUser,
  logout,
} from "../controllers/auth.js";
import { getCustomerAccess } from "../middlewares/database/databaseErrorHelpers.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.put("/resetpassword", resetPassword);
authRouter.put("/changepassword", getCustomerAccess, changePassword);
authRouter.put("/edit-user", getCustomerAccess, editUser);
authRouter.get("/logout", getCustomerAccess, logout);

export default authRouter;
