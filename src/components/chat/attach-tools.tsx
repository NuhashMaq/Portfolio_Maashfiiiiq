'use client';

import { ArrowLeft, Camera, FileText, Gamepad2, ImageIcon, Paperclip } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import GamesExplorer from './games-explorer';

interface AttachToolsProps {
  compact?: boolean;
  showOnboardingHint?: boolean;
  hintScope?: 'chat' | 'landing' | 'shared';
}

const ATTACH_HINT_DISMISSED_KEY_PREFIX = 'attach_hint_dismissed_v3';

export default function AttachTools({ compact = false, showOnboardingHint = false, hintScope = 'shared' }: AttachToolsProps) {
  const [open, setOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialShownRef = useRef(false);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const storageKey = `${ATTACH_HINT_DISMISSED_KEY_PREFIX}_${hintScope}`;

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const common = 'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/10';

  useEffect(() => {
    if (!showOnboardingHint) return;

    const dismissed = window.localStorage.getItem(storageKey) === '1';
    if (dismissed) {
      setHintDismissed(true);
      return;
    }

    showTimerRef.current = window.setTimeout(() => {
      initialShownRef.current = true;
      setShowHint(true);
    }, 5000);

    return () => {
      if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [showOnboardingHint, storageKey]);

  useEffect(() => {
    if (!showOnboardingHint || hintDismissed) return;

    if (showHint) {
      hideTimerRef.current = window.setTimeout(() => {
        setShowHint(false);
      }, 3000);
      return () => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      };
    }

    if (initialShownRef.current) {
      showTimerRef.current = window.setTimeout(() => {
        setShowHint(true);
      }, 20000);
      return () => {
        if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
      };
    }
  }, [showHint, hintDismissed]);

  const handleAttachClick = () => {
    setOpen((v) => !v);

    if (!showOnboardingHint || hintDismissed) return;

    setHintDismissed(true);
    setShowHint(false);
    window.localStorage.setItem(storageKey, '1');
  };

  return (
    <>
      <div ref={wrapperRef} className="relative">
        {showOnboardingHint && showHint && !hintDismissed && (
          <div className="pointer-events-none absolute bottom-11 left-0 z-50">
            <div className="relative w-fit max-w-[85vw] rounded-2xl border border-emerald-300/80 bg-emerald-100/90 px-6 py-2.5 text-sm text-emerald-900 shadow-xl backdrop-blur-lg dark:border-emerald-300/35 dark:bg-emerald-900/70 dark:text-emerald-50">
              <div className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 shrink-0 animate-pulse text-emerald-700 dark:text-emerald-200" />
                <span className="whitespace-nowrap">Click here to attach and play games</span>
              </div>
              <div className="absolute -bottom-1 left-8 h-2.5 w-2.5 rotate-45 border-r border-b border-emerald-300/80 bg-emerald-100/90 dark:border-emerald-300/35 dark:bg-emerald-900/70" />
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Attach"
          onClick={handleAttachClick}
          className={`inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white/70 text-slate-700 transition hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-slate-100 ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
        >
          <Paperclip className={compact ? 'h-4 w-4' : 'h-5 w-5'} />
        </button>

        {open && (
          <div className="absolute bottom-12 left-0 z-40 w-56 space-y-1 rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-black/85">
            <button type="button" className={common} onClick={() => toast.info('Camera attach coming soon')}> 
              <Camera className="h-4 w-4" /> Camera
            </button>
            <button type="button" className={common} onClick={() => toast.info('Photo attach coming soon')}>
              <ImageIcon className="h-4 w-4" /> Photos
            </button>
            <button type="button" className={common} onClick={() => toast.info('File attach coming soon')}>
              <FileText className="h-4 w-4" /> Files
            </button>
            <button
              type="button"
              className={common}
              onClick={() => {
                setOpen(false);
                setGamesOpen(true);
              }}
            >
              <Gamepad2 className="h-4 w-4" /> Explore Games
            </button>
          </div>
        )}
      </div>

      <GamesExplorer
        open={gamesOpen}
        onClose={() => setGamesOpen(false)}
        onBack={() => {
          setGamesOpen(false);
          setOpen(true);
        }}
      />
    </>
  );
}
