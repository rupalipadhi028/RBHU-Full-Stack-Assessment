# RBHU ETG Full Stack Assessment Demo

A local customer and shipment management demo with a dashboard, CSV analytics, an AI chat page, and live shipment status updates.

## Project folders

- `backend/` — Node.js and Express API, Prisma database access, PostgreSQL, login, and Swagger docs.
- `frontend/` — React website used to view and manage the data.
- `analytics/` — Python service that reads a sales CSV and creates summaries and charts.
- `docs/` — architecture, setup, presentation, Azure, Fabric, voice-agent, and SharePoint notes.

## Start the project

Install Node.js, PostgreSQL, and Python first. Start each part in its own VS Code terminal and leave the terminals open while using the app.

### 1. Start the backend API

Open a terminal in `backend/` and run:

```powershell
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

The backend needs a working PostgreSQL database and the correct `DATABASE_URL` in `backend/.env`.

### 2. Start the analytics service

Open a second terminal in `analytics/` and run:

```powershell
python -m pip install -r requirements.txt
python app.py
```

### 3. Start the frontend

Open a third terminal in VS Code and run:

```powershell
cd "C:\RBHU Full Stack Assessment\frontend"
npm install
npm run dev
```

The terminal prints a local address, usually `http://localhost:5173`. Ctrl-click that address in VS Code, or copy it into Chrome or Edge. Sign in with `admin@rbhu.local` and `Demo@123`.

The customer and shipment pages need the backend running. CSV analysis also needs the analytics service.

### Use the local AI chat

Ollama with the `llama3.2` model is the configured local provider. In a separate terminal, run:

```powershell
ollama run llama3.2
```

Then sign in, open **AI Assistant**, and send a short question. The first reply can take longer while the model starts; the page shows a thinking message while it waits. The assistant answers general shipment operations questions and does not read live customer or shipment records.

## Simple demo flow

1. Sign in.
2. Create a customer.
3. Create a shipment for that customer.
4. Change the shipment status and show the update.
5. Upload `analytics/sample-sales.csv` to show the summary and charts.

## Explain the project simply

The React website sends requests to the Node.js API. The API checks the request, applies the rules, and uses Prisma to read or save data in PostgreSQL. The Python analytics service reads a CSV and returns summary numbers and charts.

- Express routes receive requests, like Django URL/view handlers.
- Zod checks incoming data, similar to a serializer.
- Prisma is the database toolkit; PostgreSQL stores the records.
- The service applies business rules; the repository runs database queries.
- The browser calls the API and displays its response.

This is a local assessment demo. It uses one demo login. Chat history and live updates are held in memory. The announcements page returns sample data. Hover over an analytics chart and choose the camera icon to download a PNG. Fabric and voice-agent items are design proposals, not live integrations. Azure deployment is described in the docs but has not been done. See `docs/learning-guide.md`, `docs/presentation.md`, and `docs/bonus-points.md` for explanations and demo guidance.
