export const useUploadImages = async (images: { file: File }[]) => {
  const form = new FormData();

  for (const { file } of images) {
    form.append("files", file);
  }

  const res = await fetch("/api/media/create-files", {
    method: "POST",
    body: form,
    credentials: "include",
  });

  let responseData: any;
  try {
    responseData = await res.json();
  } catch (err) {
    console.error("Failed to parse JSON response:", err);
    throw new Error("Upload failed: invalid server response");
  }

  if (!res.ok) {
    throw new Error(responseData?.error || "Upload failed");
  }

  return responseData;
};
