import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const imageRouter = express.Router();

imageRouter.get("/:imageName", async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "public", "images", imageName);
  const imageData = await sharp(imagePath)
    .jpeg({
      quality: 50,
      progressive: true,
      chromaSubsampling: "4:2:0",
    })
    .toBuffer();

  res.type("image/jpeg");
  return res.send(imageData);
});

export default imageRouter;
