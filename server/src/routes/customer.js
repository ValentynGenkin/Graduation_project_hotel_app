import express from "express";
import { getCustomerAccessAndInfo } from "../controllers/customer.js";

const customerRouter = express.Router();

customerRouter.get("/auth", getCustomerAccessAndInfo);

export default customerRouter;
