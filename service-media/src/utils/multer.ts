import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
import type { Request, Response, NextFunction } from "express";

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      "image/jpeg", "image/png", "image/webp",
      "video/mp4", "video/webm", "video/quicktime"
    ];

    const isMimeAllowed = allowedMimes.includes(file.mimetype);
    const isFieldValid = file.fieldname === "file";
    const hasValidExt = /\.(jpg|jpeg|png|webp|mp4|webm|mov)$/i.test(file.originalname);

    if (!isMimeAllowed || !isFieldValid || !hasValidExt) {
      return cb(null, false);
    }

    cb(null, true);
  }
}).single("file");

export default async function validatedUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, async (err) => {
    if (err) return next(err);
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const file = req.file;

    const detected = await fileTypeFromBuffer(file.buffer);
    if (!detected) {
      return res.status(400).json({ error: "Cannot detect file type" });
    }

    const { mime } = detected;
    const isImage = mime.startsWith("image/");
    const isVideo = mime.startsWith("video/");

    if (!isImage && !isVideo) {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Tamaño máximo según tipo
    if (isImage && file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "Image exceeds 5MB" });
    }

    if (isVideo && file.size > 100 * 1024 * 1024) {
      return res.status(400).json({ error: "Video exceeds 100MB" });
    }

    next();
  });
}
