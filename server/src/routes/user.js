import express from "express";
import { createUser, getUsers } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
// userRouter.post("/register", registerUser);

export default userRouter;
