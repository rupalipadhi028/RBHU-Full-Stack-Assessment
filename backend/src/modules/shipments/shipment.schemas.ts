import { z } from "zod";

export const shipmentInput = z.object({
  trackingNumber: z.string().trim().min(3).max(80),
  customerId: z.string().min(1),
  origin: z.string().trim().min(1).max(160),
  destination: z.string().trim().min(1).max(160),
});

export const shipmentStatusInput = z.object({
  status: z.enum(["Created", "InTransit", "Delivered", "Cancelled"]),
});
