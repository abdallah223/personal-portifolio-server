import multer from "multer";
import path from "path";
import type { Request } from "express";

const MEGABYTE = 1024 * 1024;
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});

function imageFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, jpeg, png, webp)"));
  }
}

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * MEGABYTE },
});
