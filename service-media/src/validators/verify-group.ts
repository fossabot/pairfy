import { z } from "zod";

export const verifyParams = z.object({
    media_group_id: z.string().regex(
        /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        { message: "Invalid media group ID format" }
      ),
    file_ids: z.array(z.string().min(1).max(100)).min(1).max(11),
    agent_id: z.string().min(1).max(100),
    product_id: z.string().min(1).max(100)
  });