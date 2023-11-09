import express from "express";
import {
  addRoom,
  editRoom,
  getSingleRoom,
  getRooms,
  getFilters,
} from "../controllers/room.js";
import { imageUpload } from "../middlewares/imageUpload/imageUpload.js";
import {
  checkRoomExist,
  getAdminAccess,
} from "../middlewares/database/databaseErrorHelpers.js";
import { roomQueryMiddleware } from "../middlewares/query/roomQueryMiddleware.js";

const roomRouter = express.Router();

roomRouter.post(
  "/add",
  [getAdminAccess, imageUpload.array("roomImages", 10)],
  addRoom
);
roomRouter.put(
  "/:roomId/edit",
  [getAdminAccess, imageUpload.array("roomImages", 10)],
  editRoom
);
roomRouter.get("/getFilters", getFilters);
roomRouter.get("/:roomId", checkRoomExist, getSingleRoom);
roomRouter.get("/", roomQueryMiddleware, getRooms);

export default roomRouter;
