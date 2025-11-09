# 03-react-movies-complete

Fully implemented project according to the assignment.  
Features:
- Vite + React + TypeScript
- axios for HTTP requests to TMDB
- Components each in `src/components/<Name>/<Name>.tsx` + `<Name>.module.css`
- Types in `src/types/movie.ts`
- Service in `src/services/movieService.ts`
- react-hot-toast for notifications
- modern-normalize included
- Modal implemented with createPortal, ESC and backdrop close, body scroll locked while modal open
- Prettier scripts included

## Important: TMDB token
Create a `.env` file at project root with:
```
VITE_TMDB_TOKEN=your_token_here
```
Do NOT commit your token. Use Vercel env variables when deploying.

## Run locally
1. npm install
2. npm run dev
3. Open http://localhost:5173

## Notes
- Styles were created to match structure and classnames required by the task.
- The project intentionally avoids console warnings (ensure VITE_TMDB_TOKEN is set to prevent axios warnings).

