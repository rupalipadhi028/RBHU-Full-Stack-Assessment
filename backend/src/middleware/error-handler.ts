import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", details: error.issues });
    return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    res.status(409).json({ error: "A record with that unique value already exists" });
    return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
    res.status(400).json({ error: "Referenced customer does not exist" });
    return;
  }

  res.status(500).json({ error: "Internal server error" });
};
