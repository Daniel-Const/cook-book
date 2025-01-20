# Cook book server

Simple Node / Express Backend for the Cook Book app

## Database

- MySQL
- Prisma (ORM)

## Start

```bash
npm install
npm run dev
```

## Prisma

### Reload database

```bash
npx prisma db push --force-reset # Reset database for new schema
npx prisma db seed               # Seed new database
```
