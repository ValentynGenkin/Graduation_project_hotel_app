import express from "express";
import {
  addRoom,
  editRoom,
  getSingleRoom,
  getRooms,
} from "../controllers/room.js";
import { imageUpload } from "../middlewares/imageUpload/imageUpload.js";
import { checkRoomsExist } from "../middlewares/database/databaseErrorHelpers.js";
import { roomQueryMiddleware } from "../middlewares/query/roomQueryMiddleware.js";

const roomRouter = express.Router();

roomRouter.post("/add", imageUpload.array("roomImages", 10), addRoom);
roomRouter.put("/:roomId/edit", imageUpload.array("roomImages", 10), editRoom);
roomRouter.get("/:roomId", checkRoomsExist, getSingleRoom);
roomRouter.get("/", roomQueryMiddleware, getRooms);

export default roomRouter;
