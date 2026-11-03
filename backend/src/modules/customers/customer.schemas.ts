import { z } from "zod";

export const customerInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email(),
  company: z.string().trim().min(1).max(160),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const customerUpdateInput = customerInput.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Provide at least one field to update",
);
