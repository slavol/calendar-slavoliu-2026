# Calendar 2026 - varianta rezolvată complet

Aceasta este varianta nouă, curată, fără afișare publică înainte de login.

## Ce este reparat

- Fără login nu se afișează calendarul, evenimentele, filtrele sau butoanele.
- Nu există register pe site.
- Login-ul este doar pentru adminul din `supabase-config.js`.
- Evenimentele sunt salvate în Supabase.
- Duplicatele sunt eliminate prin resetarea tabelului și prin `id` unic.
- Designul este refăcut, responsive și cu texte care nu se mai taie.
- Ai add/edit/delete, import/export JSON, curățare duplicate și reset plan inițial.

## Pași obligatorii în Supabase

1. Intră în Supabase -> proiectul tău.
2. Mergi la `SQL Editor`.
3. Copiază tot conținutul din `supabase-reset.sql`.
4. Apasă `Run`.

Asta recreează tabelul `calendar_events`, activează RLS și pune evenimentele curate.

## Activează login-ul

În Supabase:

1. `Authentication -> Providers -> Email`
2. Activează providerul Email.
3. `Authentication -> Users -> Add user`
4. Creează userul:

```txt
slavoliu.preda24@gmail.com
```

Pune parola ta. Site-ul nu are register.

## Fișiere pentru GitHub Pages

În repository trebuie să fie direct în root:

```txt
index.html
styles.css
app.js
supabase-config.js
supabase-reset.sql
README.md
```

Nu urca folderul ca subfolder dacă vrei să meargă pe GitHub Pages root.

## Config actual

`supabase-config.js` este deja completat cu:

```txt
https://xlelpnkljrweenhzhftn.supabase.co
slavoliu.preda24@gmail.com
```

Cheia pusă este `sb_publishable_...`, nu secret key.
