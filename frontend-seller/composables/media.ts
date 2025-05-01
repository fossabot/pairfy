export const useUploadImages = async (images: { file: File }[]) => {
  const form = new FormData();
  for (const { file } of images) {
    form.append("files", file);
  }

  const res = await fetch("/api/media/create-files", {
    method: "POST",
    body: form,
    credentials: "include"
  });

  if (!res.ok) {
    const err = await res.json().catch((err) => console.log("ERROR1", err));
    throw new Error(err.error || "Upload failed");
  }

  return await res.json();
};
