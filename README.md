# Calendar Licență 2026 — varianta full full cu Supabase

Mini-app statică HTML/CSS/JS cu backend Supabase pentru login admin, bază de date și sincronizare live.

## Fișiere

- `index.html` — interfața
- `styles.css` — design responsive
- `app.js` — logica aplicației
- `supabase-config.js` — aici pui URL-ul și cheia publică anon
- `supabase-schema.sql` — tabel + reguli RLS + evenimente inițiale
- `events.seed.json` — backup cu evenimentele inițiale

## Setup Supabase

1. Intră pe https://supabase.com și creează un proiect nou.
2. Mergi la **SQL Editor** și rulează `supabase-schema.sql`. Înainte de Run, schimbă `your-email@gmail.com` cu emailul tău de admin.
3. Mergi la **Authentication → Users → Add user** și creează userul cu același email.
4. Mergi la **Project Settings → API** și copiază:
   - Project URL
   - anon public key
5. Pune valorile în `supabase-config.js`.
6. Hostuiește folderul pe GitHub Pages, Netlify, Vercel sau Cloudflare Pages.

## Notă

Dacă `supabase-config.js` nu e completat, aplicația rulează în mod local și salvează în browser cu `localStorage`.
