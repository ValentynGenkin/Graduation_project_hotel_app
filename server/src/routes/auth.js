import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.put("/resetpassword", resetPassword);

export default authRouter;
