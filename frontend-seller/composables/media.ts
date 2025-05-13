export const useUploadMedia = async (images: { file: File }[]) => {
  const form = new FormData();

  for (const { file } of images) {
    form.append("files", file);
  }

  try {
    const response = await $fetch("/api/media/create-files", {
      method: "POST",
      body: form,
      credentials: "include",
      async onResponseError({ response }) {
        throw new Error(
          JSON.stringify(response._data?.data || "Unknown server error")
        );
      },
    });

    return response;
  } catch (error: any) {
    console.error("❌ Error uploading images:", error);
    throw error;
  }
};

export const useUpdateMedia = async (images: { file: File }[], media_group_id: string) => {
  const form = new FormData();

  for (const { file } of images) {
    form.append("files", file);
  }

  form.append("media_group_id", media_group_id);

  try {
    const response = await $fetch("/api/media/update-files", {
      method: "POST",
      body: form,
      credentials: "include",
      async onResponseError({ response }) {
        throw new Error(
          JSON.stringify(response._data?.data || "Unknown server error")
        );
      },
    });

    return response;
  } catch (error: any) {
    console.error("❌ Error uploading images:", error);
    throw error;
  }
};

export const useMediaUrl = (mediaPath: string): string => {
  const config = useRuntimeConfig();
  //console.log("[useMediaUrl] mediaCDNBase:", config.public.mediaCDNBase);

  const base = config.public.mediaCDNBase || "";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = mediaPath.startsWith("/")
    ? mediaPath
    : `/${mediaPath}`;

  return `${normalizedBase}${normalizedPath}`;
};
