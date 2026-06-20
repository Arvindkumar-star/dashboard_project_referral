# Go Business — Referral Dashboard

A secure, responsive referral management dashboard built with React + Vite.
Users sign in, view referral overview metrics, service summary, their
referral link/code, and a searchable/sortable/paginated table of referrals,
with a detail view per referral.

## Tech stack

- React 19 + Vite
- react-router-dom (client-side routing)
- js-cookie (JWT storage)
- Plain CSS (no UI framework) — design tokens in `src/index.css`

## Project structure

```
src/
  api/            API calls (auth, referrals) + base URL config
  components/     Reusable UI: Navbar, Footer, ProtectedRoute,
                  OverviewSection, ServiceSummary, ShareReferral,
                  ReferralsTable, Pagination
  pages/          Route-level pages: Login, Dashboard, ReferralDetail, NotFound
  utils/          Formatting helpers (date, currency)
  App.jsx         BrowserRouter + Routes definition
  main.jsx        React root render (no router here)
  index.css       Global styles / design tokens
```

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
npm run preview
```

## Test credentials

```
Email:    admin@example.com
Password: admin123
```

## API

All requests go to the same backend (no separate API key — the JWT
returned at login is the only credential needed):

- `POST /api/auth/signin` — login, returns `{ data: { token } }`
- `GET /api/referrals` — full referrals payload (metrics, serviceSummary,
  referral link/code, referrals list)
- `GET /api/referrals?search=` or `?q=` — filter by name/service
- `GET /api/referrals?sort=asc|desc` — sort by date (default desc)
- `GET /api/referrals?id=<id>` — single referral by id

All authenticated requests send `Authorization: Bearer <jwt_token>`,
where `jwt_token` is read from the cookie set at login.

Pagination (10 rows/page) is handled entirely client-side, since the API
always returns the complete filtered/sorted list.

## Routing behaviour

- `/` and `/referral/:id` are protected — redirect to `/login` if the
  `jwt_token` cookie is missing.
- `/login` redirects to `/` if already authenticated.
- `*` (404) is public and intentionally not wrapped in `ProtectedRoute`.
- `App.jsx` owns `<BrowserRouter>`; `main.jsx` only renders `<App />`.

## Notes

- No `.env` file is used — the API base URL is a constant in
  `src/api/config.js` since there are no secrets to protect (the only
  credential is the login password, entered by the user at runtime).
