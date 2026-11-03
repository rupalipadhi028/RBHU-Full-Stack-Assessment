# Learning guide: how the pieces work

## One customer request

1. The React form sends JSON with `fetch` in `frontend/src/api.ts`.
2. Express matches the method/path in `backend/src/modules/customers/customer.routes.ts`.
3. Zod in `customer.schemas.ts` checks the input; invalid input becomes HTTP 400.
4. `customer.service.ts` applies the business rule; `customer.repository.ts` calls Prisma.
5. Prisma translates the query into SQL for PostgreSQL and returns the saved row.
6. Express returns JSON; React refreshes its customer list.

## Technologies in familiar terms

| Technology | Its job here | Similar idea from Django |
|---|---|---|
| Node.js | Runs JavaScript/TypeScript backend code outside the browser. | Python runtime running Django. |
| Express | Receives HTTP requests and maps routes to handlers. | Django URLs and views. |
| TypeScript | JavaScript plus type checks that catch some mistakes before runtime. | Python type hints with stricter compile-time checking. |
| Prisma | Defines models and queries PostgreSQL, and generates typed query code. | Django models and ORM. |
| Zod | Validates request JSON and returns clear validation errors. | DRF serializers/validators. |
| React | Builds the browser UI from reusable components and state. | Django templates plus browser-side UI logic. |
| Flask | A small separate Python web service for CSV analysis. | A small Django/DRF service focused on one job. |
| Pandas | Reads/cleans/groups the CSV rows. | Pandas, which you already used. |
| Plotly | Turns grouped data into interactive charts. | A charting library for analytics. |
| WebSocket | Keeps an open two-way connection so status changes arrive without refresh. | A real-time channel alongside REST APIs. |
| JWT | A signed token the client sends to prove it logged in. | SimpleJWT access token. |
| Azure App Service | Target cloud hosting for the web/API services. | A managed production host for an app. |
| Key Vault | Target secure store for cloud secrets. | A managed secrets store; never expose these values in React. |

## Explain the architecture simply

“React sends an API request. Express authenticates it and validates the data. A service applies the business rules, a repository uses Prisma to read or write PostgreSQL, and Express returns JSON. When shipment status changes, the API also broadcasts a WebSocket event. CSV reporting is a separate Flask service.”

## Be clear about demo limitations

- Login is one mock account configured for local demo; it is not Entra ID.
- Chat history and WebSocket clients live in memory and reset when the API restarts.
- Ollama is used for local rehearsal by default; OpenAI and Azure OpenAI providers are also supported by configuration. Use one of the assessment's listed providers for the formal submission if credentials are available.
- Azure is a documented target design only; no Azure resources were provisioned.
- The announcements endpoint is mocked. Fabric and voice-agent design bonuses and PNG chart export are not included.
