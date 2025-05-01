import { defineEventHandler, readMultipartFormData, createError } from "h3";
import FormData from "form-data";
import fetch from "node-fetch";

interface UploadResponse {
  success: boolean;
  files?: any[]; 
  error?: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  const files = await readMultipartFormData(event);

  if (!files?.length) {
    throw createError({ statusCode: 400, statusMessage: "No files uploaded" });
  }

  const form = new FormData();
  for (const file of files) {
    form.append("files", file.data, {
      filename: file.filename,
      contentType: file.type,
    });
  }

  const res = await fetch(`${config.serviceMediaBase}/media/create-file`, {
    method: "POST",
    body: form,
    headers: form.getHeaders(),
  });

  const data = (await res.json()) as UploadResponse;

  if (!res.ok) {
    throw createError({ statusCode: res.status, statusMessage: data.error || "Upload failed" });
  }

  return data;
});
