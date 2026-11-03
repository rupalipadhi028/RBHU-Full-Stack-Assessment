import { prisma } from "../../lib/prisma";
import type { ShipmentStatus } from "@prisma/client";
export const shipmentRepository = {
  list: () => prisma.shipment.findMany({ include: { customer: { select: { id: true, name: true, company: true } } }, orderBy: { createdAt: "desc" } }),
  findById: (id: string) => prisma.shipment.findUnique({ where: { id }, include: { customer: { select: { id: true, name: true, company: true } } } }),
  create: (data: { trackingNumber: string; customerId: string; origin: string; destination: string }) => prisma.shipment.create({ data }),
  updateStatus: (id: string, status: ShipmentStatus) => prisma.shipment.update({ where: { id }, data: { status } }),
};
