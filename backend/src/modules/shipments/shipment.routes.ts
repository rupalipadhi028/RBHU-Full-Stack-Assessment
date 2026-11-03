import { Router } from "express";
import { asyncHandler } from "../../middleware/async-handler";
import { shipmentService } from "./shipment.service";
import { publishShipmentStatusChanged } from "../../realtime/socket";
export const shipmentRoutes = Router();
shipmentRoutes.get("/", asyncHandler(async (_req, res) => res.json(await shipmentService.list())));
shipmentRoutes.post("/", asyncHandler(async (req, res) => {
  const shipment = await shipmentService.create(req.body);
  if (!shipment) { res.status(400).json({ error: "Active customer not found" }); return; }
  res.status(201).json(shipment);
}));
shipmentRoutes.get("/:id", asyncHandler(async (req, res) => {
  const shipment = await shipmentService.findById(String(req.params.id));
  if (!shipment) { res.status(404).json({ error: "Shipment not found" }); return; }
  res.json(shipment);
}));
shipmentRoutes.patch("/:id/status", asyncHandler(async (req, res) => {
  const shipment = await shipmentService.updateStatus(String(req.params.id), req.body);
  if (!shipment) { res.status(404).json({ error: "Shipment not found" }); return; }
  publishShipmentStatusChanged(shipment.id, shipment.status);
  res.json(shipment);
}));

