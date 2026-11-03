# Presentation walkthrough (10–15 minutes)

1. **Purpose and architecture (1 min):** say the app manages customers and shipments. Show the architecture diagram and explain that the website sends requests to the Node API, which stores data in PostgreSQL.
2. **Live operations flow (4 min):** sign in, add a sample customer, create a shipment for that customer, update its status, and show the dashboard/live update.
3. **API and data (2 min):** open `/docs`; explain one GET and one POST request. Point to the Prisma schema and explain that a shipment is linked to a customer.
4. **CSV analytics (2 min):** upload `analytics/sample-sales.csv`; show the totals and charts. Hover over a chart, use the camera button, and save a PNG.
5. **AI chat (1 min):** ask a short general operations question. Explain that the local Llama model answers through the API and does not query live shipment records.
6. **Bonuses and next steps (2 min):** show the SharePoint sample announcements. Explain the Fabric medallion design and proposed voice-agent flow from their docs; label these as designs, not live integrations. Summarize the Azure deployment plan and state that no Azure resources have been deployed.

Only demonstrate features you have started and personally checked. The local login and announcements are demo data. Do not display `.env` values or claim a live Fabric, voice, SharePoint, or Azure integration where there is only a design or mock.
