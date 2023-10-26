import express from "express";
import { addRoom } from "../controllers/room.js";
import { imageUpload } from "../middlewares/imageUpload/imageUpload.js";

const roomRouter = express.Router();

roomRouter.post("/add", imageUpload.array("roomImages", 10), addRoom);

export default roomRouter;
