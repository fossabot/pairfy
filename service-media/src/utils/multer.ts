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
    const hasValidExt = validExtRegex.test(file.originalname);

    if (!isMimeAllowed || !hasValidExt) {
      return cb(new Error("Invalid file type or extension"));
    }

    cb(null, true);
  }
}).array("files", 15);

export default async function validatedUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    for (const file of files) {
      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected) {
        return res.status(400).json({ error: `Cannot detect type for file: ${file.originalname}` });
      }

      const { mime, ext } = detected;
      const isImage = mime.startsWith("image/");
      const isVideo = mime.startsWith("video/");

      if (!isImage && !isVideo) {
        return res.status(400).json({ error: `Unsupported file type: ${mime}` });
      }

      if (!validExtRegex.test(`.${ext}`)) {
        return res.status(400).json({ error: `Invalid extension detected: ${file.originalname}` });
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
