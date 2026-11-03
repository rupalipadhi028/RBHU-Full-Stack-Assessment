import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const customerRepository = {
  list: () => prisma.customer.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  }),
  findActive: (id: string) => prisma.customer.findFirst({ where: { id, deletedAt: null } }),
  create: (data: { name: string; email: string; company: string; status: "Active" | "Inactive" }) =>
    prisma.customer.create({ data }),
  update: (id: string, data: Prisma.CustomerUpdateInput) => prisma.customer.update({ where: { id }, data }),
  softDelete: (id: string) => prisma.customer.update({ where: { id }, data: { deletedAt: new Date() } }),
};
