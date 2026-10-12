# Qwirkle Score Tracker

A Next.js web app for tracking scores in the Qwirkle board game.

## Features

- New game setup with custom or random player names
- Card-based score entry for each player
- Automatic score total tracking
- End-of-game summary with winner detection
- Statistics page with winner table and player details
- Persistent storage using Upstash Redis

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
6. In the Vercel dashboard, go to "Storage" → "Create" → Add "Upstash Redis".
7. Link the Redis database to the project.
8. Click "Deploy".

After deployment, the app will be live with a Vercel URL.

## Required Environment Variables

When you add Upstash Redis integration, Vercel will provide these environment variables automatically:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Local Setup Without Redis

If you want to run locally without connecting to Redis, the API route has a safe in-memory fallback for development. Games will not persist across restarts, but the app works for local testing.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Upstash Redis

## License

MIT
