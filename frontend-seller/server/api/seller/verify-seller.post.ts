import { ofetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);

  try {
    const response = await ofetch(
      `${config.serviceSellerBase}/seller/verify-seller`,
      {
        method: "POST",
        body,
        async onResponseError({ response }) {
          console.log("TEST1", response._data);
          throw new Error(JSON.stringify(response._data));
        },
      }
    );

    return response;
  } catch (err: any) {
    console.log("TEST1.2", err);
    // Esta lógica intenta rescatar el error real del backend
    const originalError =
      err?.data || // ofetch: backend body (JSON)
      err?.response?._data || // fallback: Nuxt internal fetch structure
      err?.response?.statusMessage || // fallback: textual status
      err?.message || // FetchError default
      "Unknown server error"; // ultra fallback

    console.error("🔥 Error capturado del backend:", originalError);

    throw createError({
      statusCode: err?.response?.status || err?.statusCode || 500,
      statusMessage: "Remote Service Error",
      data: originalError,
    });
  }
});
