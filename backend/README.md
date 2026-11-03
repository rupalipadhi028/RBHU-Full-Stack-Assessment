# Backend

The Express + TypeScript API for the assessment lives here. For full project setup and the demo walkthrough, see `../README.md` and `../docs/`.

## Run

```powershell
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Health: `http://localhost:3000/health` · Swagger: `http://localhost:3000/docs`.

## Demo login

Default local-only credentials: `admin@rbhu.local` / `Demo@123`. Change them in `.env` for your local demo if desired. This is a single mock account, not production identity management.

## Request flow

`routes → Zod validation → service (business rules) → repository (Prisma query) → PostgreSQL`.

Management endpoints require a bearer JWT from `POST /api/auth/login`. Never commit `.env` or show it in a presentation.
