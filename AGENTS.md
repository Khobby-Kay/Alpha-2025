# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript + Vite single-page application (kids salon & boutique e-commerce). There is no backend, database, or external API — all data is hardcoded in `src/data.ts` and state is managed client-side via React Context in `src/store.tsx`.

### Running the app

- **Dev server:** `npm run dev` (Vite, defaults to port 5173)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Lint:** `npm run lint` (ESLint)
- **Preview prod build:** `npm run preview`

### Notes

- The lint command (`npm run lint`) currently reports 2 pre-existing errors in `src/App.tsx` (setState in effect) and `src/store.tsx` (fast refresh warning). These are not blocking and exist in the base code.
- No environment variables or secrets are required.
- No Docker, database, or external services needed.
- Product images load from Unsplash CDN; they may not render if there's no internet access, but the app still functions fully.
