import { logError } from "../../util/logging.js";

const serverErrorHandler = (err, req, res, next) => {
  // this condition is unnecessary but I try to ignore no-used-vars error
  if (err === undefined) {
    next();
  }
  // TODO: Handle mongoose and mongoDB error like validationError, CastError
  if (err.name === "MongoServerError") {
    err.status = 400;
    if (err.code === 11000 && err.message.includes("email")) {
      err.message =
        "There is already an account associated with this email. Please login or try another email.";
    }
  }
  logError(`${err.name}: ${err.message}`);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default serverErrorHandler;
