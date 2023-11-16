import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
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
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import taskRouter from "./routes/task.js";
// Create an express server
const app = express();
process.env.NODE_ENV === "production" && app.use(morgan("dev"));
// Tell express to use the json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allow everyone to access our API. In a real application, we would need to restrict this!
dotenv.config();
process.env.NODE_ENV === "production"
  ? app.use(cors())
  : app.use(cors({ origin: "http://localhost:8080", credentials: true }));
//cookie parser middleware
app.use(cookieParser());

// Image serving

app.get("/public/images/:imageName", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public", "images", imageName);
  res.setHeader("Content-Type", "image/jpeg");
  return res.sendFile(imagePath);
});
// Swagger documentation endpoint
const specs = swaggerJsdoc(swaggerOptions(process.env.BASE_SERVER_URL));
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
app.use("/api/task", taskRouter);

// Tell express to use "serverErrorHandler(err,req,res)" function as error handler
app.use(serverErrorHandler);

export default app;
