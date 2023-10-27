import asyncHandler from "express-async-handler";
import User from "../models/User";
import { validateUserRegisterInput } from "../util/input/inputValidator";
import sendEmail from "../util/mailer/sendEmail";
import { adminRegistrationEmail } from "../util/mailer/mailTemplates";

export const addAdmin = asyncHandler(async (req, res, next) => {
  const userObject = validateUserRegisterInput(req, next);
  userObject.role = "admin";

  const admin = await User.create(userObject);

  await sendEmail({
    from: process.env.SMTP_USER,
    to: admin.email,
    subject: "Your admin account for Hotel administration.",
    html: adminRegistrationEmail(
      admin.firstname,
      admin.email,
      userObject.password
    ),
  });

  return res.status(201).json({
    success: true,
    message:
      "Admin registered successfully and login credentials sent as email.",
  });
});
