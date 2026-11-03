import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { customerRoutes } from "./modules/customers/customer.routes";
import { shipmentRoutes } from "./modules/shipments/shipment.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { chatRoutes } from "./modules/chat/chat.routes";
import { announcementRoutes } from "./modules/announcements/announcements.routes";
import { authenticate } from "./middleware/authenticate";
import { errorHandler } from "./middleware/error-handler";
import { openApiDocument } from "./docs/openapi";

export const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const allowedFrontendOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_ORIGIN,
].filter((origin): origin is string => Boolean(origin)));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedFrontendOrigins.has(origin)) callback(null, true);
    else callback(new Error("Frontend origin is not allowed"));
  },
}));
app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => { const started = Date.now(); res.on("finish", () => console.log(req.method + " " + req.path + " " + res.statusCode + " " + (Date.now() - started) + "ms")); next(); });
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/api/auth", authRoutes);
app.use("/api", authenticate);
app.use("/api/customers", customerRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/announcements", announcementRoutes);
app.use(errorHandler);


