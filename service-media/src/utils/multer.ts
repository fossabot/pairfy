import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
import { imageSize } from "image-size";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import filenamify from "filenamify";

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

    if (!isMimeAllowed || !hasValidExt || !isFieldValid) {
      return cb(null, false); // Rechaza silenciosamente archivos inválidos
    }

    cb(null, true);
  },
}).array("files", 15); // Max 15 archivos

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
      return res.status(400).json({ error: "No valid files uploaded" });
    }

    for (const file of files) {
      // 🚫 Prevención de doble extensión tipo .jpg.exe
      const segments = file.originalname.split(".");
      if (segments.length > 2) {
        return res.status(400).json({
          error: `Filename contains multiple extensions: ${file.originalname}`,
        });
      }

      const cleanName = file.originalname.normalize("NFKC");
      if (/\s+\.(exe|bat|cmd)$/i.test(cleanName)) {
        return res
          .status(400)
          .json({ error: `Potential spoofed filename: ${file.originalname}` });
      }

      if (
        file.originalname.includes("..") ||
        file.originalname.includes("/") ||
        file.originalname.includes("\\") ||
        file.originalname.includes(String.fromCharCode(0))
      ) {
        return res
          .status(400)
          .json({ error: `Invalid filename: ${file.originalname}` });
      }

      // 🧼 Sanitizar nombre del archivo (aunque no se usa en disco aún)
      file.originalname = filenamify(path.basename(file.originalname), {
        replacement: "_",
      });

      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected) {
        return res
          .status(400)
          .json({ error: `Cannot detect file type: ${file.originalname}` });
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
        return res
          .status(400)
          .json({
            error: `Invalid extension detected in ${file.originalname}`,
          });
      }

      if (!isImage && !isVideo) {
        return res
          .status(400)
          .json({ error: `Unsupported file type: ${mime}` });
      }

      if (isImage) {
        if (file.size > 5 * 1024 * 1024) {
          return res
            .status(400)
            .json({ error: `Image exceeds 5MB: ${file.originalname}` });
        }

        try {
          const { width, height } = imageSize(file.buffer);
          if (!width || !height) {
            return res
              .status(400)
              .json({
                error: `Cannot determine dimensions: ${file.originalname}`,
              });
          }

          if (width < 500 || height < 500 || width > 5000 || height > 5000) {
            return res.status(400).json({
              error: `Invalid image dimensions in ${file.originalname}: ${width}x${height}`,
            });
          }
        } catch {
          return res
            .status(400)
            .json({ error: `Corrupt image: ${file.originalname}` });
        }
      }

      if (isVideo && file.size > 100 * 1024 * 1024) {
        return res
          .status(400)
          .json({ error: `Video exceeds 100MB: ${file.originalname}` });
      }
    }

    next();
  });
}
