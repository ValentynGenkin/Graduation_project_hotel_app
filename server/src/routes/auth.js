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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's name
 *               lastname:
 *                 type: string
 *                 description: The user's last name
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 format: email
 *               password:
 *                 type: string
 *                 description: The user's login password
 *     responses:
 *       201:
 *         description: User created successfully and customer_access_token set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request (e.g. missing fields)
 */

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.put("/resetpassword", resetPassword);
authRouter.get("/logout", getCustomerAccess, logout);

export default authRouter;
