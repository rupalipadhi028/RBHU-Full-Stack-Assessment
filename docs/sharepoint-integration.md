# SharePoint announcements integration (bonus proof of concept)

`GET /api/announcements` currently returns two mocked announcements so the frontend/API flow can be demonstrated without tenant credentials.

For SharePoint Online, a production implementation would:

1. Register the application in Microsoft Entra ID and grant only the required Microsoft Graph permissions for the selected SharePoint site/list.
2. Use a managed identity or certificate-based application authentication from the backend; keep any credentials in Key Vault.
3. Request a Microsoft Graph access token server-side and query a configured SharePoint list, for example an announcements list with title, summary, and publish date.
4. Map the Graph response to the same small JSON shape returned by the mock endpoint, handle paging/errors, and cache briefly if appropriate.
5. Keep authorization and site/list IDs on the server. The browser should call the backend endpoint, never Microsoft Graph with an application secret.

No SharePoint tenant was configured for this assessment, so only the mocked endpoint is implemented.
