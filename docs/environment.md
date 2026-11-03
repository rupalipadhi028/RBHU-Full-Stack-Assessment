# Environment variables

Create `backend/.env` from `.env.example`. Keep `.env` private and never commit it.

| Variable | Purpose |
|---|---|
| `PORT` | Express API port; defaults to 3000. |
| `DATABASE_URL` | PostgreSQL connection string for `rbhu_assessment`. |
| `FRONTEND_ORIGIN` | Allowed browser origin for CORS; local default is `http://localhost:5173`. |
| `JWT_SECRET` | Local signing secret; use a long random value. |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Mock demo login only. Use non-production credentials. |
| `AI_PROVIDER` | `ollama`, `openai`, or `azure-openai`. Local default is `ollama`. |
| `OLLAMA_URL`, `OLLAMA_MODEL` | Local Ollama service URL and model. |
| `OPENAI_API_KEY`, `OPENAI_MODEL` | OpenAI API credentials and model. Keep the key only in the backend environment. |
| `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_DEPLOYMENT`, `AZURE_OPENAI_API_VERSION` | Azure OpenAI settings. In Azure, use Key Vault and managed identity instead of a committed file. |

The frontend contains no API secrets. Its local API addresses are in `frontend/src/api.ts` and the analytics fetch in `frontend/src/App.tsx`.
