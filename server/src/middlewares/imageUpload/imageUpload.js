import multer from "multer";
import path from "path";
import ServerError from "../../util/error/ServerError.js";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const rootDir = path.resolve(currentDir, "..", "..");
    cb(null, path.join(rootDir, "/public/images"));
  },
  filename: function (req, file, cb) {
    req.images = req.images || [];
    const timestamp = Date.now();
    req.images.push(
      "/public/images/" + timestamp + file.originalname.replace(" ", "-")
    );

    cb(null, timestamp + file.originalname.replace(" ", "-"));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/png",
    "image/gif",
    "image/jpg",
    "image/jpeg",
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new ServerError("Please provide a valid file", 400), false);
  }
  return cb(null, true);
};

export const imageUpload = multer({ storage, fileFilter });
