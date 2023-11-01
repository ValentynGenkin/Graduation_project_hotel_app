import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import roomRouter from "./routes/room.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import serverErrorHandler from "./middlewares/error/serverErrorHandler.js";
import bookingRouter from "./routes/booking.js";
import { checkCustomerIdentity } from "./middlewares/cookie/cookieHelpers.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());
//cookie parser middleware
app.use(cookieParser());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use(checkCustomerIdentity);
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/admin", adminRouter);
app.use("/api/booking", bookingRouter);

// Tell express to use "serverErrorHandler(err,req,res)" function as error handler
app.use(serverErrorHandler);

export default app;
