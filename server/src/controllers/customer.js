import asyncHandler from "express-async-handler";
import {
  isTokenIncluded,
  verifyUserToken,
} from "../util/authorization/auth.js";

export const getCustomerAccessAndInfo = asyncHandler(async (req, res) => {
  const token = isTokenIncluded(req);
  if (!token) {
    return res.status(200).json({
      success: false,
    });
  }
  const customer = verifyUserToken(token);
  if (!customer) {
    return res.status(200).json({
      success: false,
    });
  }
  return res.status(200).json({
    success: true,
    customer: {
      name: customer.firstname,
      lastname: customer.lastname,
      id: customer.id,
    },
  });
});
