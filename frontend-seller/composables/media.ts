export default async function useUploadImages(images: { file: File }[]) {
    const form = new FormData();
    for (const { file } of images) {
      form.append("files", file);
    }
  
    const res = await fetch("/api/media/create-file", {
      method: "POST",
      body: form,
    });
  
    if (!res.ok) {
      const err = await res.json().catch((err) => console.log("ERROR1", err));
      throw new Error(err.error || "Upload failed");
    }
  
    return await res.json();
  }
  