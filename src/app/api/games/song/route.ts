import { NextResponse } from 'next/server';

type SongItem = {
  trackName: string;
  artistName: string;
  previewUrl: string;
  artworkUrl100?: string;
};

const SEARCH_TERMS = [
  'best bollywood songs arijit singh',
  'rahat fateh ali khan qawwali',
  'nusrat fateh ali khan qawwali classics',
  'coke studio pakistan popular songs',
  'atif aslam famous songs',
  'kailash kher sufi songs',
  'mohit chauhan hit songs',
  'shreya ghoshal top songs',
  'sonu nigam classics',
  'english trending songs',
  'billboard top hits',
  'global pop hits',
];

const FALLBACK_DISTINCT_ARTISTS = [
  'Adele',
  'Drake',
  'Beyonce',
  'Shakira',
  'Coldplay',
  'Eminem',
  'Rihanna',
  'Pitbull',
  'Bruno Mars',
  'Ed Sheeran',
  'Sia',
  'Maroon 5',
  'Atif Aslam',
  'Arijit Singh',
  'Sonu Nigam',
  'Shreya Ghoshal',
  'Nusrat Ali',
  'Rahat Ali',
  'Kailash Kher',
  'Mohit Chauhan',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalizeName(name: string): string {
  const cleaned = name
    .replace(/\(.*?\)/g, '')
    .replace(/feat\.?\s.+$/i, '')
    .replace(/ft\.?\s.+$/i, '')
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
  try {
    const term = encodeURIComponent(pickRandom(SEARCH_TERMS));
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=30`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to load songs' }, { status: 502 });
    }

    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    const valid: SongItem[] = results.filter(
      (r: any): r is SongItem =>
        typeof r?.trackName === 'string' &&
        typeof r?.artistName === 'string' &&
        typeof r?.previewUrl === 'string'
    );

    if (valid.length < 5) {
      return NextResponse.json({ error: 'Not enough song data' }, { status: 500 });
    }

    const answer = pickRandom(valid);
    const answerNormalized = normalizeName(answer.artistName);

    const uniqueArtists = Array.from(new Set(valid.map((r) => r.artistName).filter(Boolean))).filter(
      (name) => name !== answer.artistName
    );

    const distractors: string[] = [];
    for (const name of uniqueArtists.sort(() => Math.random() - 0.5)) {
      const normalized = normalizeName(name);
      if (!name || normalized === answerNormalized) continue;
      const tooSimilarToAnswer = hasAnyTokenOverlap(normalized, answerNormalized);
      const tooSimilarToOthers = distractors.some((d) => hasAnyTokenOverlap(normalized, normalizeName(d)));
      if (!tooSimilarToAnswer && !tooSimilarToOthers) {
        distractors.push(name);
      }
      if (distractors.length === 3) break;
    }

    if (distractors.length < 3) {
      for (const name of FALLBACK_DISTINCT_ARTISTS.sort(() => Math.random() - 0.5)) {
        const normalized = normalizeName(name);
        if (!name || normalized === answerNormalized || distractors.includes(name)) continue;
        if (hasAnyTokenOverlap(normalized, answerNormalized)) continue;
        if (distractors.some((d) => hasAnyTokenOverlap(normalized, normalizeName(d)))) continue;
        distractors.push(name);
        if (distractors.length === 3) break;
      }
    }

    const options = [answer.artistName, ...distractors].sort(() => Math.random() - 0.5);

    return NextResponse.json({
      game: 'song-artist',
      question: `Who is the artist of \"${answer.trackName}\"?`,
      trackName: answer.trackName,
      previewUrl: answer.previewUrl,
      artworkUrl: answer.artworkUrl100?.replace('100x100', '600x600') || answer.artworkUrl100,
      fullAnswer: answer.artistName,
      answer: answer.artistName,
      options,
    });
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
