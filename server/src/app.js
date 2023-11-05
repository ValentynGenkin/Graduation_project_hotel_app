import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./util/swagger/swaggerConfig.js";

import roomRouter from "./routes/room.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import serverErrorHandler from "./middlewares/error/serverErrorHandler.js";
import bookingRouter from "./routes/booking.js";
import { checkCustomerIdentity } from "./middlewares/cookie/cookieHelpers.js";
import customerRouter from "./routes/customer.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
// you should allow credentials so you can access cookies
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BASE_CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
const corsOptions = {
  origin: process.env.BASE_CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
// handle preflight
app.options("*", cors(corsOptions));

//cookie parser middleware
app.use(cookieParser());

// Swagger documentation endpoint
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
app.use("/api/customer", customerRouter);

// Tell express to use "serverErrorHandler(err,req,res)" function as error handler
app.use(serverErrorHandler);

export default app;
