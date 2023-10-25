import asyncHandler from "express-async-handler";
import {
  isTokenIncluded,
  verifyCustomerToken,
} from "../../util/authorization/auth.js";
import ServerError from "../../util/error/ServerError.js";

export const getCustomerAccess = asyncHandler(async (req, res, next) => {
  //get customer_access_token from cookies
  const token = isTokenIncluded(req);

  if (!token) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }

  //verify customer_access_token
  const customer = verifyCustomerToken(token);

  if (!customer) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }
  // add customer to request. to use next functions
  req.customer = customer;
  next();
});
