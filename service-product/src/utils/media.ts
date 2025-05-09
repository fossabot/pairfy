import axios from "axios";

interface MediaPayload {
  agent_id: string;
  media_group_id: string;
  file_ids: string[];
  product_id: string;
  thumbnail_id: string;
}

export async function checkFileGroup(
  url: string,
  payload: MediaPayload,
  internalSecret: string
): Promise<boolean> {
  try {
    await axios.post(url, payload, {
      timeout: 15000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${internalSecret}`,
      },
    });
    return true;
  } catch {
    return false;
  }
}
