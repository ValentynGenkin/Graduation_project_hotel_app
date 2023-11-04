import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {
  comparePassword,
  validateUserRegisterInput,
} from "../util/input/inputValidator.js";
import sendEmail from "../util/mailer/sendEmail.js";
import { adminRegistrationEmail } from "../util/mailer/mailTemplates.js";
import ServerError from "../util/error/ServerError.js";
import Room from "../models/Room.js";
import { paginationHelper } from "../util/query/roomQueryHelper.js";

export const registerAdmin = asyncHandler(async (req, res, next) => {
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

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    next(new ServerError("Please provide all required fields.", 400));
  }

  const admin = (
    await User.where({ email: email, role: "admin" }).select("+password")
  )[0];

  if (!admin || !comparePassword(password, admin.password)) {
    return next(
      new ServerError(
        "Invalid username or password. Please check your credentials.",
        401
      )
    );
  }
  const token = await admin.generateJwtFromUser();
  return res
    .status(200)
    .cookie("admin_access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: false,
    })
    .json({
      success: true,
      message: "Admin logged in",
    });
});

export const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie("admin_access_token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: false,
    })
    .json({
      success: true,
      message: "You have logged out successfully",
    });
});

export const getActiveBookingsByRoom = asyncHandler(async (req, res) => {
  // const bookings = await req.bookings.exec();

  const rooms = req.rooms;
  const bookings = req.bookings;

  bookings.forEach((booking) => {
    rooms.forEach((room) => {
      if (booking.roomId.toString() === room._id.toString()) {
        rooms[rooms.indexOf(room)].bookings.push(booking);
      }
    });
  });
  return res.status(200).json({
    success: true,
    pagination: req.pagination,
    rooms: rooms,
  });
});

export const getAllRooms = asyncHandler(async (req, res) => {
  const roomsQuery = Room.find({});
  const paginationResults = await paginationHelper(Room, roomsQuery, req);
  const rooms = await paginationResults.query;

  return res.status(200).json({
    success: true,
    pagination: paginationResults.pagination,
    rooms: rooms,
  });
});
