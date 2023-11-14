import ServerError from "../error/ServerError.js";
import bcrypt from "bcryptjs";

export const validateUserRegisterInput = (req, next) => {
  const { firstname, lastname, phone, password, email, birthday, payment } =
    req.body;
  if (!(firstname && lastname && phone && password && email)) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  return { firstname, lastname, phone, password, email, birthday, payment };
};

export const validateUserLoginInput = (req, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  return { email, password };
};
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const validateAddRoomInput = (req, next) => {
  const { roomNo, roomDescription, roomType, bedCount, roomPrice, facilities } =
    req.body;
  if (
    !(
      roomNo &&
      roomDescription &&
      roomType &&
      bedCount &&
      roomPrice &&
      facilities
    )
  ) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  const images = req.images ? req.images : [];
  return {
    roomNo,
    roomDescription,
    roomType,
    bedCount,
    roomPrice,
    facilities,
    images,
  };
};

export const validateEditRoomInput = (req, next) => {
  const validKeys = [
    "roomNo",
    "roomDescription",
    "roomType",
    "bedCount",
    "roomPrice",
    "facilities",
  ];
  const updateInputsObj = {};
  Object.keys(req.body).forEach((input) => {
    if (input && validKeys.includes(input)) {
      updateInputsObj[input] = req.body[input];
    }
  });
  if (req.images) {
    updateInputsObj.images = req.images;
  }

  if (Object.keys(updateInputsObj).length === 0) {
    return next(
      new ServerError("Please provide at least one room input to update.", 400)
    );
  }

  return updateInputsObj;
};

export const validateCheckOutInput = (req, next) => {
  const { firstname, lastname, phone, email, birthday, payment } = req.body;
  if (!(firstname && lastname && phone && email && birthday && payment)) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  const userObj = { firstname, lastname, phone, email, birthday, payment };
  userObj.password = req.cookies.guestCustomerId;

  return userObj;
};

export const validateEditUserInput = (req) => {
  const { firstname, lastname, phone, email, birthday, payment } = req.body;
  const editObj = {};

  if (firstname) {
    editObj.firstname = firstname;
  }
  if (lastname) {
    editObj.lastname = lastname;
  }
  if (phone) {
    editObj.phone = phone;
  }
  if (email) {
    editObj.email = email;
  }
  if (birthday) {
    editObj.birthday = birthday;
  }
  if (payment) {
    editObj.payment = payment;
  }
  return editObj;
};
