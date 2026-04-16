import { NextResponse } from 'next/server';

type MovieItem = {
  title: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
};

const FALLBACK_DISTINCT_MOVIES = [
  'Inception',
  'Titanic',
  'Avatar',
  'Interstellar',
  'Parasite',
  'Oldboy',
  'Gladiator',
  'Whiplash',
  'Joker',
  'Memento',
  'Alien',
  'Amelie',
  'Tenet',
  'Dune',
  'Skyfall',
  'Heat',
  'Shrek',
  'Coco',
  'Moana',
  'Frozen',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalizeTitle(title: string): string {
  const cleaned = title
    .replace(/\(.*?\)/g, '')
    .replace(/[-|:].*$/, '')
    .trim();
  return cleaned;
}

function tokenSet(value: string): Set<string> {
  return new Set(value.toLowerCase().split(/\s+/).filter((t) => t.length > 2));
}

function overlapRatio(a: string, b: string): number {
  const sa = tokenSet(a);
  const sb = tokenSet(b);
  if (sa.size === 0 || sb.size === 0) return 0;
  let common = 0;
  sa.forEach((token) => {
    if (sb.has(token)) common += 1;
  });
  return common / Math.min(sa.size, sb.size);
}

function hasAnyTokenOverlap(a: string, b: string): boolean {
  return overlapRatio(a, b) > 0;
}

export async function GET() {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'TMDB_API_KEY is not configured on the server' },
      { status: 503 }
    );
  }

  try {
    const page = Math.floor(Math.random() * 8) + 1;
    const isKorean = Math.random() < 0.4;
    const url = isKorean
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&with_original_language=ko&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&with_original_language=en&page=${page}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to load TMDB data' }, { status: 502 });
    }

    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];
    const valid: MovieItem[] = results.filter(
      (m: any): m is MovieItem =>
        typeof m?.title === 'string' &&
        (typeof m?.backdrop_path === 'string' || typeof m?.poster_path === 'string')
    );

    if (valid.length < 5) {
      return NextResponse.json({ error: 'Not enough movie data' }, { status: 500 });
    }

    const answer = pickRandom(valid);
    const answerNormalized = normalizeTitle(answer.title);

    const distractors: string[] = [];
    const pool = valid
      .filter((m) => m.title !== answer.title)
      .map((m) => m.title)
      .filter(Boolean);

    for (const title of pool.sort(() => Math.random() - 0.5)) {
      const normalized = normalizeTitle(title);
      if (normalized === answerNormalized) continue;
      const tooSimilarToAnswer = hasAnyTokenOverlap(normalized, answerNormalized);
      const tooSimilarToOthers = distractors.some((d) => hasAnyTokenOverlap(normalized, normalizeTitle(d)));
      if (!tooSimilarToAnswer && !tooSimilarToOthers && !distractors.includes(title)) {
        distractors.push(title);
      }
      if (distractors.length === 3) break;
    }

    if (distractors.length < 3) {
      for (const title of FALLBACK_DISTINCT_MOVIES.sort(() => Math.random() - 0.5)) {
        const normalized = normalizeTitle(title);
        if (normalized === answerNormalized || distractors.includes(title)) continue;
        if (hasAnyTokenOverlap(normalized, answerNormalized)) continue;
        if (distractors.some((d) => hasAnyTokenOverlap(normalized, normalizeTitle(d)))) continue;
        distractors.push(title);
        if (distractors.length === 3) break;
      }
    }

    const options = [answer.title, ...distractors].sort(() => Math.random() - 0.5);

    return NextResponse.json({
      game: 'movie-frame',
      question: 'Guess the movie from this iconic frame.',
      imageUrl: `https://image.tmdb.org/t/p/w780${answer.backdrop_path || answer.poster_path}`,
      fullAnswer: answer.title,
      answer: answer.title,
      options,
      hint: answer.release_date
        ? `${isKorean ? 'Korean' : 'Hollywood'} | ${String(answer.release_date).slice(0, 4)}`
        : isKorean
          ? 'Korean movie'
          : 'Hollywood movie',
    });
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
