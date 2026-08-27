# ASK Studios Next.js Migration

This folder is the fresh Next.js rebuild of the old PHP/static site.

## Run Locally

```powershell
cd "C:\Users\HP\OneDrive\Desktop\success\ask-studio-next"
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor and run `supabase-schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Fill in:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD
```

The public contact form writes into `bookings`.

The dashboard is at `/dashboard`. It uses `ADMIN_PASSWORD`, uploads images to the public `portfolio` storage bucket, and stores metadata in `portfolio_items`.

## Notes

The original PHP project is untouched. Existing media was copied into `public/images`.
