import ServerError from "../error/ServerError.js";

export const validateUserRegisterInput = (req, next) => {
  const { firstname, lastname, phone, password, email } = req.body;
  if (!(firstname && lastname && phone && password && email)) {
    return next(new ServerError("Please provide all required inputs", 400));
  }
  return { firstname, lastname, phone, password, email };
};
