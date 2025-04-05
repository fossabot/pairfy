import { z } from 'zod';

// General string validator for address-type fields
const safeText = z
  .string()
  .min(2, "Too short")
  .max(100, "Too long")
  .regex(/^[a-zA-Z0-9\s\-.,'#áéíóúÁÉÍÓÚñÑ]+$/u, {
    message: "Invalid characters",
  });

// City should only contain letters/spaces
const citySchema = z
  .string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Z\s\-áéíóúÁÉÍÓÚñÑ]+$/u, "City must contain only letters");

// Receiver — similar to name
const nameSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(/^[a-zA-Z\s.'\-áéíóúÁÉÍÓÚñÑ]+$/u, {
    message: "Receiver contains invalid characters",
  });

// Postal code — numeric only, 4–10 digits
const postalSchema = z
  .string()
  .regex(/^\d{4,10}$/, "Postal code must be 4-10 digits");

// Product ID — uppercase alphanumeric
const productIdSchema = z
  .string()
  .min(5)
  .max(30)
  .regex(/^[A-Z0-9]+$/, "Invalid product ID format");

export const pendingEndpointSchema = z.object({
  product_id: productIdSchema,
  product_units: z
    .number()
    .int("Must be an integer")
    .positive("Must be greater than zero")
    .lte(1000, "Maximum 1000 units allowed"),
  data: z.object({
    city: citySchema,
    address: safeText,
    receiver: nameSchema,
    postal: postalSchema,
    other: safeText.optional(),
  }),
});
