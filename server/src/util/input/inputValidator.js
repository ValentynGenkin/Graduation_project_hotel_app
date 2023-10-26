import ServerError from "../error/ServerError.js";
import bcrypt from "bcryptjs";

export const validateUserRegisterInput = (req, next) => {
  const { firstname, lastname, phone, password, email } = req.body;
  if (!(firstname && lastname && phone && password && email)) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  return { firstname, lastname, phone, password, email };
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
