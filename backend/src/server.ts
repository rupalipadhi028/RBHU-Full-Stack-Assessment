import "dotenv/config";
import { createServer } from "node:http";
import { app } from "./app";
import { prisma } from "./lib/prisma";
import { attachWebSocket } from "./realtime/socket";

const port = Number(process.env.PORT ?? 3000);
const server = createServer(app);
attachWebSocket(server);
server.listen(port, () => console.log("API and WebSocket listening on port " + port));
const shutdown = async () => {
  server.close(async () => { await prisma.$disconnect(); process.exit(0); });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
