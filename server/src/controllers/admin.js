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
import Booking from "../models/Booking.js";
import {
  calculateTotalBookedDays,
  getDaysInMonth,
  getMonth,
  getMonthBoundaries,
} from "../util/dateHelper.js";
import { calculateDailyCost } from "../util/admin/adminHelpers.js";

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
      admin: {
        firstname: admin.firstname,
        lastname: admin.lastname,
      },
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

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("firstname lastname phone email role _id")
    .sort({ createdAt: -1 });

  return res.status(200).json({ success: true, users });
});

export const getDashboardAccess = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true });
});

export const getAmountForChart = asyncHandler(async (req, res) => {
  const { month, year, nextMonth, yearOfNextMonth } = getMonth(req);

  const numberOfDays = getDaysInMonth(year, month);

  const bookings = await Booking.find({
    createdAt: {
      $gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
      $lt: new Date(
        `${yearOfNextMonth}-${
          nextMonth < 10 ? `0${nextMonth}` : nextMonth
        }-01T00:00:00.000Z`
      ),
    },
  });

  const dailyCosts = calculateDailyCost(bookings);

  const resultArray = Array.from({ length: numberOfDays }, (_, index) => {
    const day = index + 1;
    return Object.prototype.hasOwnProperty.call(dailyCosts, day.toString())
      ? dailyCosts[day]
      : 0;
  });

  return res.status(200).json({ success: true, resultArray });
});

export const getOccupationByMonth = asyncHandler(async (req, res) => {
  const { firstDayCurrentMonth, firstDayNextMonth } = getMonthBoundaries(
    new Date()
  );
  const bookings = await Booking.find({
    createdAt: {
      $gte: firstDayCurrentMonth,
      $lt: firstDayNextMonth,
    },
  }).populate("bookingDetails");

  const totalBookedDaysOfMonth = calculateTotalBookedDays(bookings);

  const totalRoomCount = await Room.countDocuments(Room.find({}));
  const totalAvailableDays =
    getDaysInMonth(
      firstDayCurrentMonth.getFullYear(),
      firstDayCurrentMonth.getMonth()
    ) * totalRoomCount;

  const occupationRateOfMonth = totalBookedDaysOfMonth / totalAvailableDays;

  return res.status(200).json({
    success: true,
    occupation: occupationRateOfMonth,
  });
});
