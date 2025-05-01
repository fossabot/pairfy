import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
import { imageSize } from "image-size";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import filenamify from "filenamify";
import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

const allowedMimes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const validExtRegex = /\.(jpg|jpeg|png|webp|mp4|webm|mov)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const isMimeAllowed = allowedMimes.includes(file.mimetype);
    const hasValidExt = validExtRegex.test(file.originalname);
    const isFieldValid = file.fieldname === "files";
    if (!isMimeAllowed || !hasValidExt || !isFieldValid) return cb(null, false);
    cb(null, true);
  },
}).array("files", 15);

// Detecta resolución de video usando ffmpeg
function getVideoDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    stream.end(buffer);
    ffmpeg(stream)
      .ffprobe((err, data) => {
        if (err) return reject(err);
        const streamInfo = data.streams.find((s) => s.width && s.height);
        if (!streamInfo || !streamInfo.width || !streamInfo.height)
          return reject(new Error("No video resolution found"));
        resolve({ width: streamInfo.width, height: streamInfo.height });
      });
  });
}

export default async function validatedUpload(req: Request, res: Response, next: NextFunction) {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) return res.status(400).json({ error: "No valid files uploaded" });

    for (const file of files) {
      const segments = file.originalname.split(".");
      if (segments.length > 2) {
        return res.status(400).json({ error: `Filename contains multiple extensions: ${file.originalname}` });
      }

      const cleanName = file.originalname.normalize("NFKC");
      if (/\s+\.(exe|bat|cmd)$/i.test(cleanName)) {
        return res.status(400).json({ error: `Potential spoofed filename: ${file.originalname}` });
      }

      if (/(\.\.|\/|\\|\0)/.test(file.originalname)) {
        return res.status(400).json({ error: `Invalid filename: ${file.originalname}` });
      }

      file.originalname = filenamify(path.basename(file.originalname), { replacement: "_" });

      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected) {
        return res.status(400).json({ error: `Cannot detect file type: ${file.originalname}` });
      }

      const { mime, ext } = detected;
      const isImage = mime.startsWith("image/");
      const isVideo = mime.startsWith("video/");

      if (file.mimetype !== mime) {
        return res.status(400).json({
          error: `MIME mismatch in ${file.originalname} (declared: ${file.mimetype}, actual: ${mime})`,
        });
      }

      if (!validExtRegex.test(`.${ext}`)) {
        return res.status(400).json({ error: `Invalid extension detected in ${file.originalname}` });
      }

      if (!isImage && !isVideo) {
        return res.status(400).json({ error: `Unsupported file type: ${mime}` });
      }

      if (file.size < 1024) {
        return res.status(400).json({ error: `File too small to be valid: ${file.originalname}` });
      }

      if (isImage) {
        if (file.size > 5 * 1024 * 1024) {
          return res.status(400).json({ error: `Image exceeds 5MB: ${file.originalname}` });
        }

        try {
          const { width, height } = imageSize(file.buffer);
          if (!width || !height) {
            return res.status(400).json({ error: `Cannot determine dimensions: ${file.originalname}` });
          }

          if (width < 500 || height < 500 || width > 5000 || height > 5000) {
            return res.status(400).json({
              error: `Invalid image dimensions in ${file.originalname}: ${width}x${height}`,
            });
          }
        } catch {
          return res.status(400).json({ error: `Corrupt image: ${file.originalname}` });
        }
      }

      if (isVideo) {
        if (file.size > 100 * 1024 * 1024) {
          return res.status(400).json({ error: `Video exceeds 100MB: ${file.originalname}` });
        }

        try {
          const { width, height } = await getVideoDimensions(file.buffer);
          if (width < 240 || height < 240 || width > 7680 || height > 4320) {
            return res.status(400).json({
              error: `Invalid video resolution in ${file.originalname}: ${width}x${height}`,
            });
          }
        } catch (e) {
          return res.status(400).json({ error: `Failed to analyze video: ${file.originalname}` });
        }
      }
    }

    next();
  });
}
