import { Router } from "express";
import { asyncHandler } from "../../middleware/async-handler";
import { customerService } from "./customer.service";
export const customerRoutes = Router();
customerRoutes.get("/", asyncHandler(async (_req, res) => res.json(await customerService.list())));
customerRoutes.post("/", asyncHandler(async (req, res) => res.status(201).json(await customerService.create(req.body))));
customerRoutes.put("/:id", asyncHandler(async (req, res) => {
  const customer = await customerService.update(String(req.params.id), req.body);
  if (!customer) { res.status(404).json({ error: "Customer not found" }); return; }
  res.json(customer);
}));
customerRoutes.delete("/:id", asyncHandler(async (req, res) => {
  if (!(await customerService.softDelete(String(req.params.id)))) { res.status(404).json({ error: "Customer not found" }); return; }
  res.status(204).send();
}));

