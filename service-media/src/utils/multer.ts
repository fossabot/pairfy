import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
import type { Request, Response, NextFunction } from "express";

const allowedMimes = [
  "image/jpeg", "image/png", "image/webp",
  "video/mp4", "video/webm", "video/quicktime"
];

const validExtRegex = /\.(jpg|jpeg|png|webp|mp4|webm|mov)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const isMimeAllowed = allowedMimes.includes(file.mimetype);
    const isFieldValid = file.fieldname === "files";
    const hasValidExt = validExtRegex.test(file.originalname);

    if (!isMimeAllowed || !isFieldValid || !hasValidExt) {
      return cb(null, false);
    }

    cb(null, true);
  }
}).array("files", 15); // Acepta hasta 15 archivos

export default async function validatedUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, async (err) => {
    if (err) return next(err);

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    for (const file of req.files as Express.Multer.File[]) {
      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected) {
        return res.status(400).json({ error: `Cannot detect type for file: ${file.originalname}` });
      }

      const { mime } = detected;
      const isImage = mime.startsWith("image/");
      const isVideo = mime.startsWith("video/");

      if (!isImage && !isVideo) {
        return res.status(400).json({ error: `Unsupported file type: ${mime}` });
      }

      if (isImage && file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: `Image exceeds 5MB: ${file.originalname}` });
      }

      if (isVideo && file.size > 100 * 1024 * 1024) {
        return res.status(400).json({ error: `Video exceeds 100MB: ${file.originalname}` });
      }
    }

    next();
  });
}
