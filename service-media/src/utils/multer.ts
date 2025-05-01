import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
import { imageSize } from "image-size";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import filenamify from "filenamify";
import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

const allowedMimes = [
  "image/jpeg", "image/png", "image/webp",
  "video/mp4", "video/webm", "video/quicktime",
];

const validExtRegex = /\.(jpg|jpeg|png|webp|mp4|webm|mov)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const isValid =
      allowedMimes.includes(file.mimetype) &&
      validExtRegex.test(file.originalname) &&
      file.fieldname === "files";
    cb(null, isValid);
  },
}).array("files", 15);

// Helpers
function isMaliciousName(name: string): boolean {
  return /(\.\.|\/|\\|\0)/.test(name) || name.split(".").length > 2 || /\s+\.(exe|bat|cmd)$/i.test(name);
}

function sanitizeFilename(filename: string): string {
  return filenamify(path.basename(filename.normalize("NFKC")), { replacement: "_" });
}

function getVideoDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    stream.end(buffer);
    ffmpeg(stream).ffprobe((err, data) => {
      if (err) return reject(err);
      const streamInfo = data.streams.find((s) => s.width && s.height);
      if (!streamInfo) return reject(new Error("No video resolution found"));
      resolve({ width: streamInfo.width!, height: streamInfo.height! });
    });
  });
}

function validateImage(file: Express.Multer.File): string | null {
  if (file.size > 5 * 1024 * 1024) return `Image exceeds 5MB: ${file.originalname}`;

  try {
    const { width, height } = imageSize(file.buffer);
    if (!width || !height) return `Cannot determine dimensions: ${file.originalname}`;
    if (width < 500 || height < 500 || width > 5000 || height > 5000)
      return `Invalid image dimensions in ${file.originalname}: ${width}x${height}`;
  } catch {
    return `Corrupt image: ${file.originalname}`;
  }

  return null;
}

async function validateVideo(file: Express.Multer.File): Promise<string | null> {
  if (file.size > 100 * 1024 * 1024) return `Video exceeds 100MB: ${file.originalname}`;

  try {
    const { width, height } = await getVideoDimensions(file.buffer);
    if (width < 240 || height < 240 || width > 7680 || height > 4320)
      return `Invalid video resolution in ${file.originalname}: ${width}x${height}`;
  } catch {
    return `Failed to analyze video: ${file.originalname}`;
  }

  return null;
}

export default async function validatedUpload(req: Request, res: Response, next: NextFunction) {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const files = req.files as Express.Multer.File[];
    if (!files?.length) return res.status(400).json({ error: "No valid files uploaded" });

    for (const file of files) {
      if (isMaliciousName(file.originalname)) {
        return res.status(400).json({ error: `Invalid or spoofed filename: ${file.originalname}` });
      }

      file.originalname = sanitizeFilename(file.originalname);

      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected) {
        return res.status(400).json({ error: `Cannot detect file type: ${file.originalname}` });
      }

      const { mime, ext } = detected;
      if (file.mimetype !== mime) {
        return res.status(400).json({
          error: `MIME mismatch in ${file.originalname} (declared: ${file.mimetype}, actual: ${mime})`,
        });
      }

      if (!validExtRegex.test(`.${ext}`)) {
        return res.status(400).json({ error: `Invalid extension detected in ${file.originalname}` });
      }

      if (file.size < 1024) {
        return res.status(400).json({ error: `File too small to be valid: ${file.originalname}` });
      }

      const typeError = mime.startsWith("image/")
        ? validateImage(file)
        : mime.startsWith("video/")
        ? await validateVideo(file)
        : `Unsupported file type: ${mime}`;

      if (typeError) return res.status(400).json({ error: typeError });
    }

    next();
  });
}
