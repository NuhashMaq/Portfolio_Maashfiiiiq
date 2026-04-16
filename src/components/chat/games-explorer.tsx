'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clapperboard, Crown, ExternalLink, Music2, RefreshCw, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type GameKind = 'song' | 'movie' | 'chess';

type GamePayload = {
  question: string;
  options: string[];
  answer: string;
  fullAnswer?: string;
  imageUrl?: string | null;
  artworkUrl?: string | null;
  previewUrl?: string | null;
  hint?: string;
  puzzleUrl?: string;
  title?: string;
  error?: string;
};

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

interface GamesExplorerProps {
  open: boolean;
  onClose: () => void;
  onBack?: () => void;
}

async function fetchGame(kind: GameKind): Promise<GamePayload> {
  const map: Record<GameKind, string> = {
    song: '/api/games/song',
    movie: '/api/games/movie',
    chess: '/api/games/chess',
  };
  const res = await fetch(map[kind], { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default function GamesExplorer({ open, onClose, onBack }: GamesExplorerProps) {
  const [active, setActive] = useState<GameKind | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [payload, setPayload] = useState<GamePayload | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const load = async (kind: GameKind) => {
    setLoading(true);
    setSelected(null);
    try {
      const data = await fetchGame(kind);
      setPayload(data);
    } catch {
      setPayload({ question: 'Failed to load game', options: [], answer: '', error: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setActive(null);
      setPayload(null);
      setSelected(null);
    }
  }, [open]);

  const switchGame = (kind: GameKind) => {
    setActive(kind);
    void load(kind);
  };

  if (!open || !mounted) return null;

  const isCorrect = selected === payload?.answer;
  const displayOptions = (payload?.options || []).map((opt, idx) => ({
    raw: opt,
    label: OPTION_LABELS[idx] || String(idx + 1),
  }));

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/45 p-3 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-18 w-full max-w-2xl max-h-[82dvh] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white/45 p-3 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-white/8 md:mb-24 md:p-4"
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => {
              if (onBack) onBack();
              else onClose();
            }}
            className="rounded-full p-2 hover:bg-white/45 dark:hover:bg-white/14"
            aria-label="Back to attach menu"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold">Explore Games</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/45 dark:hover:bg-white/14" aria-label="Close games explorer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => switchGame('song')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center text-sm backdrop-blur-md ${active === 'song' ? 'border-cyan-300/70 bg-cyan-500/25 text-cyan-900 dark:text-cyan-100' : 'border-slate-300/70 bg-white/35 dark:border-white/20 dark:bg-white/8'}`}
          >
            <Music2 className="h-4 w-4" /> Song Guess
          </button>
          <button
            onClick={() => switchGame('movie')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center text-sm backdrop-blur-md ${active === 'movie' ? 'border-amber-300/70 bg-amber-500/25 text-amber-900 dark:text-amber-100' : 'border-slate-300/70 bg-white/35 dark:border-white/20 dark:bg-white/8'}`}
          >
            <Clapperboard className="h-4 w-4" /> Movie Guess
          </button>
          <button
            onClick={() => switchGame('chess')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center text-sm backdrop-blur-md ${active === 'chess' ? 'border-violet-300/70 bg-violet-500/25 text-violet-900 dark:text-violet-100' : 'border-slate-300/70 bg-white/35 dark:border-white/20 dark:bg-white/8'}`}
          >
            <Crown className="h-4 w-4" /> Play Chess
          </button>
        </div>

        {!active && (
          <p className="mb-3 px-1 text-center text-sm text-slate-600 dark:text-slate-300">
            Select a game above to start.
          </p>
        )}

        <div className="px-1 text-center">
          {loading && <p className="text-sm text-slate-500">Loading game...</p>}
          {!loading && payload?.error && <p className="text-sm text-rose-500">{payload.error}</p>}

          {!loading && !payload?.error && payload && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white/35 p-3 text-center backdrop-blur-md dark:border-white/12 dark:bg-white/10">
                <p className="text-base font-semibold md:text-lg">{payload.question}</p>
              </div>

              {(payload.imageUrl || payload.artworkUrl) && (
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                  <Image
                    src={(payload.imageUrl || payload.artworkUrl) as string}
                    alt="Game visual"
                    width={1200}
                    height={700}
                    className="h-44 w-full object-cover md:h-64"
                  />
                </div>
              )}

              {payload.previewUrl && (
                <audio controls className="w-full">
                  <source src={payload.previewUrl} />
                </audio>
              )}

              {payload.hint && <p className="text-center text-xs text-slate-600 dark:text-slate-300">Hint: {payload.hint}</p>}

              {active !== 'chess' && (
                <div className="grid grid-cols-2 gap-2">
                  {displayOptions.map((opt) => (
                    <button
                      key={opt.raw}
                      onClick={() => setSelected(opt.raw)}
                      className={`rounded-xl border px-3 py-2 text-sm backdrop-blur-md transition ${
                        selected === opt.raw
                          ? opt.raw === payload.answer
                            ? 'border-emerald-400 bg-emerald-500/15 text-emerald-800 dark:text-emerald-100'
                            : 'border-rose-400 bg-rose-500/15 text-rose-800 dark:text-rose-100'
                          : 'border-slate-300/80 bg-white/35 hover:bg-white/50 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/16'
                      }`}
                    >
                      <div className="flex items-center justify-start gap-2 text-left">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current/30 text-xs font-semibold">
                          {opt.label}
                        </span>
                        <span className="text-left text-sm font-medium">{opt.raw}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selected && active !== 'chess' && (
                <p className={`text-center text-sm font-medium ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isCorrect
                    ? `Correct! ${payload.fullAnswer || payload.answer}`
                    : `Not quite. Correct answer: ${payload.fullAnswer || payload.answer}`}
                </p>
              )}

              <div
                className={`flex items-center gap-2 pt-1 ${
                  active === 'chess' ? 'justify-center' : 'justify-between'
                }`}
              >
                {active !== 'chess' && (
                  <button
                    onClick={() => {
                      if (active) void load(active);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    <RefreshCw className="h-4 w-4" />
                    New Question
                  </button>
                )}

                {active === 'chess' && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <a
                      href="https://www.chess.com/play/computer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-violet-300/70 bg-violet-500/20 px-3 py-1.5 text-sm text-violet-800 hover:bg-violet-500/30 dark:text-violet-100"
                    >
                      Play vs Computer
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.chess.com/play/online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-violet-300/70 bg-violet-500/20 px-3 py-1.5 text-sm text-violet-800 hover:bg-violet-500/30 dark:text-violet-100"
                    >
                      Play Online
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
