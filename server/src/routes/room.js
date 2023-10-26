import express from "express";
import { addRoom, editRoom } from "../controllers/room.js";
import { imageUpload } from "../middlewares/imageUpload/imageUpload.js";

const roomRouter = express.Router();

roomRouter.post("/add", imageUpload.array("roomImages", 10), addRoom);
roomRouter.put("/:roomId/edit", imageUpload.array("roomImages", 10), editRoom);

export default roomRouter;
