import asyncHandler from "express-async-handler";
import {
  isTokenIncluded,
  verifyCustomerToken,
} from "../../util/authorization/auth.js";
import ServerError from "../../util/error/ServerError.js";
import Room from "../../models/Room.js";

export const getCustomerAccess = asyncHandler(async (req, res, next) => {
  //get customer_access_token from cookies
  const token = isTokenIncluded(req);

  if (!token) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }

  //verify customer_access_token
  const customer = verifyCustomerToken(token);

  if (!customer) {
    next(
      new ServerError(
        "You do not have authorization to access this route.",
        401
      )
    );
  }
  // add customer to request. to use next functions
  req.customer = customer;
  next();
});

export const checkRoomsExist = asyncHandler(async (req, res, next) => {
  const { roomId } = req.params;
  const roomIds = [roomId];
  const rooms = roomIds.map(async (roomId) => {
    const room = await Room.findById(roomId);

    if (!room) {
      next(
        new ServerError(
          `There is not any room with this id. id: ${roomId}`,
          404
        )
      );
    }
    return room;
  });
  await Promise.all(rooms).then((rooms) => {
    req.rooms = rooms;
  });

  next();
});
