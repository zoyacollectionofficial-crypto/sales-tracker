# Sales Tracker

Mobile-first web app for pharmaceutical medical representatives (Team 4C, Highnoon Pharmaceuticals, Pakistan).
Track daily sales against monthly targets, returns, working days, and incentives.

## Run it

**Option 1 — GitHub Pages (recommended for phones):**
1. Go to the repository **Settings → Pages**.
2. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
3. Open the published URL on your phone → browser menu → **Add to Home screen** (or Install app).

**Option 2 — Local:**
Unzip and double-click `start-local.bat` (Windows + Python required), then open the shown
address (e.g. `http://192.168.1.5:8000`) on your phone's browser while on the same WiFi.

## First-time setup

1. Create a free project at https://supabase.com
2. In Supabase **SQL Editor**, run the whole `supabase.sql` file.
3. Turn **Confirm email OFF**: Authentication → Providers → Email.
4. Set **Site URL**: Authentication → URL Configuration (your Pages URL).
5. In Supabase **Project Settings → API**, copy the Project URL and **anon public** key,
   then paste them into the config block at the top of `index.html`:
   `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
6. Commit & push `index.html` — Pages redeploys automatically.

Full non-technical guide: see `SETUP.md`. Test checklist: see `TESTING.md`.

## Tech

Single `index.html` (HTML + CSS + vanilla JS, no build step), Supabase (Auth + Postgres + RLS),
PWA with service worker (`sw.js`) for offline use.
