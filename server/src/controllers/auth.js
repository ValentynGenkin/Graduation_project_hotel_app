import asyncHandler from "express-async-handler";
import {
  comparePassword,
  validateUserLoginInput,
  validateUserRegisterInput,
} from "../util/input/inputValidator.js";
import User from "../models/User.js";
import sendEmail from "../util/mailer/sendEmail.js";
import { registrationEmail } from "../util/mailer/mailTemplates.js";
import ServerError from "../util/error/ServerError.js";

export const register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, phone, password, email } =
    validateUserRegisterInput(req, next);

  const user = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
  });
  const token = await user.generateJwtFromUser();

  const userObject = user.toObject();
  delete userObject.password;

  await sendEmail({
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Welcome to Hotel",
    html: registrationEmail,
  });
  return res
    .status(201)
    .cookie("customer_access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .json({
      success: true,
      customer: userObject,
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = validateUserLoginInput(req, next);

  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !comparePassword(password, user.password)) {
    return next(
      new ServerError(
        "Invalid username or password. Please check your credentials.",
        401
      )
    );
  }
  const token = await user.generateJwtFromUser();

  const userObject = user.toObject();
  delete userObject.password;

  return res
    .status(200)
    .cookie("customer_access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .json({
      success: true,
      customer: userObject,
    });
});
