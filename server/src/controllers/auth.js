import asyncHandler from "express-async-handler";
import {
  comparePassword,
  validateEditUserInput,
  validateUserLoginInput,
  validateUserRegisterInput,
} from "../util/input/inputValidator.js";
import User from "../models/User.js";
import sendEmail from "../util/mailer/sendEmail.js";
import {
  passwordChangedEmail,
  registrationEmail,
  resetPasswordEmail,
} from "../util/mailer/mailTemplates.js";
import ServerError from "../util/error/ServerError.js";
import Booking from "../models/Booking.js";

export const register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, phone, birthday, payment, password, email } =
    validateUserRegisterInput(req, next);

  const user = await User.create({
    firstname,
    lastname,
    email,
    phone,
    birthday,
    payment,
    password,
  });
  const token = await user.generateJwtFromUser();

  const userObject = user.toObject();
  delete userObject.password;

  await sendEmail({
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Welcome to Hotel",
    html: registrationEmail(firstname),
  });

  let guestCustomerBooking;
  if (req.cookies.booking && req.cookies.guestCustomerId) {
    guestCustomerBooking = await Booking.findByIdAndUpdate(
      req.cookies.booking._id,
      {
        customerId: user._id,
        guestCustomerId: null,
      }
    );
    res.cookie("booking", guestCustomerBooking, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    });
  }
  return res
    .status(201)
    .cookie("customer_access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .clearCookie("guestCustomerId")
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

  let guestCustomerBooking;
  if (req.cookies.booking && req.cookies.guestCustomerId) {
    guestCustomerBooking = await Booking.findByIdAndUpdate(
      req.cookies.booking._id,
      {
        customerId: user._id,
        guestCustomerId: null,
      },
      { new: true }
    );
    res.cookie("booking", guestCustomerBooking, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    });
  }

  return res
    .status(200)
    .cookie("customer_access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .clearCookie("guestCustomerId")
    .json({
      success: true,
      customer: userObject,
    });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    return next(
      new ServerError(
        "There is no account associated with this email. Please check your email.",
        400
      )
    );
  }
  const resetPasswordToken = user.getResetPasswordTokenFromUser();
  await user.save();
  // send email with reset password link to customer. this link will redirect customer to frontend.
  // After they provide new password input in the frontend,
  // frontend will send post request to the url which is provided in request parameters as reset_password_url
  const resetPasswordUrl = `${process.env.BASE_CLIENT_URL}/customer/resetpassword?reset_password_url=${process.env.BASE_SERVER_URL}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Reset Password",
      html: resetPasswordEmail(resetPasswordUrl),
    });
    return res.status(200).json({
      success: true,
      message: "Reset password email is sent.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(
      new ServerError("Email could not be sent,please try again later.", 500)
    );
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;
  if (!password) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  if (!resetPasswordToken) {
    return next(
      new ServerError(
        "Please provide a valid token in your request params",
        400
      )
    );
  }
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ServerError("Invalid token or session expired", 401));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  await sendEmail({
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Password Change",
    html: passwordChangedEmail,
  });

  return res.status(200).json({
    success: true,
    message: "Password is changed successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie("customer_access_token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: false,
    })
    .json({
      success: true,
      message: "You have logged out successfully",
    });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, repeatNewPassword } = req.body;
  if (
    !newPassword ||
    !repeatNewPassword ||
    typeof newPassword !== "string" ||
    newPassword !== repeatNewPassword
  ) {
    return next(
      new ServerError("Invalid password or repeatNewPassword inputs")
    );
  }

  const customer = await User.findById(req.customer.id).select("+password");
  if (!customer) {
    return next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }

  if (!comparePassword(currentPassword, customer.password)) {
    return next(new ServerError("Current password input is not correct!", 401));
  }

  customer.password = newPassword;
  await customer.save();

  return res.status(200).json({
    success: true,
    msg: "Password is changed!",
  });
});

export const editUser = asyncHandler(async (req, res, next) => {
  const editObj = validateEditUserInput(req);
  const customer = await User.findByIdAndUpdate(req.customer.id, editObj, {
    new: true,
  });
  if (!customer) {
    return next(
      new ServerError(
        "customer_access_token is not associated with any user.",
        404
      )
    );
  }

  return res.status(200).json({
    success: true,
    customer: customer,
  });
});
