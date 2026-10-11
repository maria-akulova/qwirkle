import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

type GameRecord = {
  id: string;
  startedAt: string;
  playersCount: number;
  winner: string;
  winnerScore: number;
  players: Array<{ name: string; score: number }>;
};

const GAMES_KEY = 'qwirkle:games';
let localGames: GameRecord[] = [];

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

async function getGames(): Promise<GameRecord[]> {
  const redis = await getRedis();

  if (!redis) {
    return localGames;
  }

  try {
    const games = await redis.get<GameRecord[]>(GAMES_KEY);
    return Array.isArray(games) ? games : [];
  } catch (error) {
    console.error('Failed to fetch games from Redis:', error);
    return localGames;
  }
}

async function saveGames(games: GameRecord[]) {
  const redis = await getRedis();

  if (!redis) {
    localGames = games;
    return;
  }

  try {
    await redis.set(GAMES_KEY, games);
  } catch (error) {
    console.error('Failed to save games to Redis:', error);
    localGames = games;
  }
}

export async function GET() {
  try {
    const games = await getGames();
    return NextResponse.json(games);
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const games = await getGames();
    const nextGames = [...games, body as GameRecord];

    await saveGames(nextGames);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to save game:', error);
    return NextResponse.json({ error: 'Failed to save game' }, { status: 500 });
  }
}
