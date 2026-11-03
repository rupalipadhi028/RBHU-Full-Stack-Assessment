# API quick reference

Interactive Swagger UI: `http://localhost:3000/docs`.

Protected routes require `Authorization: Bearer <JWT>`. Obtain a local demo token from `POST /api/auth/login` with the demo email/password documented in the root README. The React app signs in and attaches the token automatically.

| Method | Route | Description |
|---|---|---|
| GET | `/health` | API health check. |
| POST | `/api/auth/login` | Mock login; returns short-lived JWT. |
| GET, POST | `/api/customers` | List active customers; create customer. |
| PUT, DELETE | `/api/customers/{id}` | Update customer; soft-delete customer. |
| GET, POST | `/api/shipments` | List shipments; create shipment. |
| GET | `/api/shipments/{id}` | Shipment details and customer summary. |
| PATCH | `/api/shipments/{id}/status` | Change status and broadcast `shipment_status_changed`. |
| GET | `/api/dashboard/summary` | Customer/shipment totals and status counts. |
| POST | `/api/chat` | AI question with conversation ID/history. |
| GET | `/api/announcements` | Mock SharePoint announcements (bonus proof of concept). |
| POST | `http://localhost:5000/analyze` | Separate Flask service: multipart CSV field `file`. |
| WebSocket | `ws://localhost:3000/ws` | Send an authentication message first; then receive shipment status events. |
