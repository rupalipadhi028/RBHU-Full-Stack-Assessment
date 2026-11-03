# Database schema

The Prisma schema in `backend/prisma/schema.prisma` is the source of truth.

- **Customer**: ID, name, unique email, company, Active/Inactive status, `deletedAt`, and created/updated timestamps. Deletion sets `deletedAt`; list endpoints hide soft-deleted records.
- **Shipment**: ID, unique tracking number, customer foreign key, origin, destination, Created/InTransit/Delivered/Cancelled status, and timestamps.
- **Relationship**: one customer can have many shipments. `Shipment.customerId` is indexed.
- **Authentication**: the assessment demo uses one environment-configured account and signed JWTs. Users are not stored in the database; production would use Microsoft Entra ID.

Create/update the schema through Prisma migrations, not manual table edits. After schema changes, run `npm run db:generate` and `npm run db:migrate` in `backend/`.
