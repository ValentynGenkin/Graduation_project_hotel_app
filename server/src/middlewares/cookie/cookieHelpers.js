import asyncHandler from "express-async-handler";
import { v4 } from "uuid";

export const checkCustomerIdentity = asyncHandler(async (req, res, next) => {
  if (!req.cookies.customer_access_token && !req.cookies.guestCustomerId) {
    const uniqueId = v4();
    res.cookie("guestCustomerId", uniqueId, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    });
  }
  next();
});
