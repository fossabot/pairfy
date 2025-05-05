import { z } from "zod";

const cursorPattern = /^\d{13}_PRD-\d{6}-[A-Z0-9]{7}$/;

export const verifyParams = z.object({
  cursor: z.string().regex(cursorPattern, {
    message: "Invalid cursor format. Must be: <13-digit-timestamp>_PRD-YYMMDD-XXXXXXX",
  }).optional(),

  reverseCursor: z.string().regex(cursorPattern, {
    message: "Invalid reverseCursor format. Must be: <13-digit-timestamp>_PRD-YYMMDD-XXXXXXX",
  }).optional(),
})
.refine((data) => !(data.cursor && data.reverseCursor), {
  message: "Cannot use both cursor and reverseCursor",
  path: ["cursor"],
});
