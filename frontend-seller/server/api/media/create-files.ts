import {
  defineEventHandler,
  readMultipartFormData,
  createError,
  parseCookies,
} from "h3";

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
    if (!file.data || !Buffer.isBuffer(file.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid file buffer for ${file.filename}`,
      });
    }

    const blob = new Blob([file.data], {
      type: file.type || "application/octet-stream",
    });

    form.append("files", blob, file.filename);
  }

  const cookies = parseCookies(event);
  const sessionCookie = cookies.session;

  try {
    const data = await $fetch<UploadResponse>(
      `${config.serviceMediaBase}/media/create-files`,
      {
        method: "POST",
        body: form,
        headers: {
          cookie: sessionCookie ? `session=${sessionCookie}` : "",
        },
        async onResponseError({ response }) {
          throw new Error(
            JSON.stringify(response._data?.data || "Unknown server error")
          );
        }
      }
    );

    return data;
  } catch (error: any) {
    throwRemoteError(error)
  }
});
