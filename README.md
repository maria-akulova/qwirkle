# Qwirkle Score Tracker

A Next.js web app for tracking scores in the Qwirkle board game.

## Features

- New game setup with custom or random player names
- Card-based score entry for each player
- Automatic score total tracking
- End-of-game summary with winner detection
- Statistics page with winner table and player details
- Persistent storage using Vercel KV (Redis)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Open https://vercel.com and sign in with your GitHub account.
3. Click "Add New Project".
4. Import the `maria-akulova/qwirkle` repository.
5. Keep the default Next.js settings.
6. In the Vercel dashboard, create a Vercel Redis / KV datastore.
7. Link the KV database to the project.
8. Click "Deploy".

After deployment, the app will be live with a Vercel URL.

## Required Environment Variables

When you add Vercel KV, Vercel will provide the required environment variables automatically:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

## Local Setup Without Vercel KV

If you want to run locally without Redis, the API route has a safe in-memory fallback for development. It does not persist across restarts, but it allows the app to work during local testing.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Vercel KV (Redis)

## License

MIT
