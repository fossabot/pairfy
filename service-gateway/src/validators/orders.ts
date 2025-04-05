import { z } from 'zod';

// Simple regex to avoid basic script tags or SQL injection keywords
const safeString = z
  .string()
  .min(1)
  .max(100)
  .regex(/^(?!.*<script>|.*SELECT|.*INSERT|.*DELETE|.*UPDATE).*$/i, {
    message: "Potentially unsafe input detected",
  });

const postalRegex = /^[0-9]{4,10}$/;

export const pendingEndpointSchema = z.object({
  data: z.object({
    city: safeString,
    address: safeString,
    receiver: safeString,
    postal: z.string()
      .regex(postalRegex, "Postal must be a number between 4 and 10 digits")
      .max(10),
    other: z.string().max(100).optional(),
  }),
  product_id: z.string()
    .min(1)
    .max(50)
    .regex(/^[A-Z0-9]+$/, "Invalid product ID format"), // assume alphanumeric product code
  product_units: z.number()
    .int({ message: "Product units must be an integer" })
    .positive("Product units must be a positive number")
    .lte(1000, "Maximum 1000 units allowed per request"),
});

