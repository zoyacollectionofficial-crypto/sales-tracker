# Sales Tracker — Setup Guide

Follow these steps in order. No technical background needed.

## 1. Create a Supabase project
1. Go to https://supabase.com and create a free account.
2. Click **New project**, give it a name (e.g. `sales-tracker`), set a database password, and wait until the project is ready.

## 2. Run the database SQL
1. In your Supabase project, open **SQL Editor** (left menu).
2. Click **New query**.
3. Open the file `supabase.sql` from this folder, copy its entire contents, paste into the query box, and click **Run**.
4. You should see "Success. No rows returned".

## 3. Turn "Confirm email" OFF
1. Go to **Authentication → Providers → Email**.
2. Turn **OFF** "Confirm email".
3. Click **Save**.

## 4. Set the Site URL (for password reset)
1. Go to **Authentication → URL Configuration**.
2. Set **Site URL** to the web address where you will host the app (you will know it after step 6, e.g. `https://your-site.netlify.app`). You can come back and update this later.
3. Click **Save**.

## 5. Paste your keys into the app
1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. Open `index.html` in any text editor (e.g. Notepad).
4. Near the top of the `<script>` section find:
   ```
   const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL";
   const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY";
   ```
5. Replace the placeholder text with your values (keep the quotes) and save.

## 6. Deploy to Netlify (drag-and-drop)
1. Make a ZIP file containing exactly these files/folders: `index.html`, `sw.js`, `manifest.json`, and the `icons` folder (a ready-made `sales-tracker-netlify.zip` is included).
2. Go to https://app.netlify.com/drop (log in or create a free account).
3. Drag the ZIP file onto the page. Netlify will deploy it and give you a site URL.
4. Go back to step 4 and set that URL as the Site URL in Supabase.

## 7. Add a manager (optional)
1. The manager must first **create an account in the app** (sign up once).
2. In Supabase **SQL Editor**, run:
   ```sql
   insert into public.managers (user_id)
   select id from auth.users where email = 'manager@example.com'
   on conflict (user_id) do nothing;
   ```
   (Replace `manager@example.com` with the manager's login email.)
3. The manager will see a **Team** tab after logging in again.

## 8. How to update later
1. Edit `index.html` (or any file) as needed.
2. Rebuild the ZIP with the same files (`index.html`, `sw.js`, `manifest.json`, `icons/`).
3. In Netlify, open your site → **Deploys** → drag the new ZIP onto the deploys list (or use a fresh Netlify Drop and point your domain to it).
4. No database changes are needed for app updates — user data is preserved in Supabase.
