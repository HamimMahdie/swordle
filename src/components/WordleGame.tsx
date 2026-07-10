'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { AffirmationModal } from './AffirmationModal';
import Image from 'next/image';

interface SavedState {
  guesses: string[];
  colors: ('correct' | 'present' | 'absent')[][];
  status: 'IN_PROGRESS' | 'WON' | 'LOST';
  date: string;
}

const LOCAL_STORAGE_KEY = 'saumyas-wordle-state';

export function WordleGame() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [colors, setColors] = useState<('correct' | 'present' | 'absent')[][]>([]);
  const [gameStatus, setGameStatus] = useState<'IN_PROGRESS' | 'WON' | 'LOST'>('IN_PROGRESS');
  const [isRevealingRow, setIsRevealingRow] = useState<boolean>(false);
  const [shakeRowIndex, setShakeRowIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dateStr, setDateStr] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  // Get user's local date string as YYYY-MM-DD
  const getLocalDateString = useCallback(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Show a retro-beveled message toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  }, []);

  // Initialize and check date reset
  useEffect(() => {
    setMounted(true);
    const today = getLocalDateString();
    setDateStr(today);

    let timer: NodeJS.Timeout;

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: SavedState = JSON.parse(saved);
        if (parsed.date === today) {
          setGuesses(parsed.guesses);
          setColors(parsed.colors);
          setGameStatus(parsed.status);
          if (parsed.status !== 'IN_PROGRESS') {
            // Open modal after a tiny delay if game is already completed today
            timer = setTimeout(() => setShowModal(true), 800);
          }
        } else {
          // New day, reset state
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } catch (err) {
        console.error('Failed to parse saved game state:', err);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [getLocalDateString]);

  // Check for local midnight reset while page is open
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getLocalDateString();
      if (dateStr && dateStr !== today) {
        // Midnight reset! Clear state and reload
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.location.reload();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [dateStr, getLocalDateString]);

  // Persist game state
  const saveGameState = useCallback(
    (newGuesses: string[], newColors: ('correct' | 'present' | 'absent')[][], newStatus: 'IN_PROGRESS' | 'WON' | 'LOST') => {
      const stateToSave: SavedState = {
        guesses: newGuesses,
        colors: newColors,
        status: newStatus,
        date: dateStr,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    },
    [dateStr]
  );

  // Handle character inputs
  const onChar = useCallback(
    (char: string) => {
      if (gameStatus !== 'IN_PROGRESS' || isRevealingRow) return;
      if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(char)) {
        setCurrentGuess((prev) => prev + char.toUpperCase());
      }
    },
    [currentGuess, gameStatus, isRevealingRow]
  );

  // Handle deletion
  const onDelete = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRevealingRow) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus, isRevealingRow]);

  // Handle submission
  const onEnter = useCallback(async () => {
    if (gameStatus !== 'IN_PROGRESS' || isRevealingRow) return;

    if (currentGuess.length !== 5) {
      setShakeRowIndex(guesses.length);
      setTimeout(() => setShakeRowIndex(null), 500);
      showToast('Not enough letters');
      return;
    }

    setIsRevealingRow(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentGuess, date: dateStr }),
      });

      const data = await response.json();

      if (!data.isValid) {
        // Word was invalid or not in dictionary
        setShakeRowIndex(guesses.length);
        setTimeout(() => setShakeRowIndex(null), 500);
        showToast(data.error || 'Not in word list');
        setIsRevealingRow(false);
        return;
      }

      // Valid word: perform grid reveals
      const newGuesses = [...guesses, currentGuess];
      const newColors = [...colors, data.colors];

      // Wait for card flip animations to complete before updating game status and showing modal
      setTimeout(() => {
        let newStatus: 'IN_PROGRESS' | 'WON' | 'LOST' = 'IN_PROGRESS';
        if (data.isWin) {
          newStatus = 'WON';
          setGameStatus('WON');
          setShowModal(true);
        } else if (newGuesses.length >= 6) {
          newStatus = 'LOST';
          setGameStatus('LOST');
          setShowModal(true);
        }

        setGuesses(newGuesses);
        setColors(newColors);
        setCurrentGuess('');
        setIsRevealingRow(false);
        saveGameState(newGuesses, newColors, newStatus);
      }, 5 * 150 + 500); // 5 letters * 150ms delay + 500ms anim time
    } catch (err) {
      console.error('Failed to verify guess:', err);
      showToast('Connection error');
      setIsRevealingRow(false);
    }
  }, [currentGuess, guesses, colors, gameStatus, isRevealingRow, dateStr, showToast, saveGameState]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Enter') {
        onEnter();
      } else if (e.key === 'Backspace') {
        onDelete();
      } else {
        onChar(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, onDelete, onChar]);

  // Map keyboard character colors based on guess history
  const getCharStatuses = () => {
    const charStatuses: Record<string, 'correct' | 'present' | 'absent'> = {};

    guesses.forEach((guess, guessIndex) => {
      const rowColors = colors[guessIndex];
      for (let i = 0; i < guess.length; i++) {
        const char = guess[i].toUpperCase();
        const color = rowColors[i];

        if (color === 'correct') {
          charStatuses[char] = 'correct';
        } else if (color === 'present') {
          if (charStatuses[char] !== 'correct') {
            charStatuses[char] = 'present';
          }
        } else if (color === 'absent') {
          if (charStatuses[char] !== 'correct' && charStatuses[char] !== 'present') {
            charStatuses[char] = 'absent';
          }
        }
      }
    });

    return charStatuses;
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col flex-1 px-4 py-2 sm:py-6 justify-center items-center h-full min-h-[100dvh]">
        <div className="animate-pulse font-press-start text-retro-brown text-sm">
          LOADING COZY WORDLE...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col flex-1 px-4 py-2 sm:py-6 justify-between select-none h-full min-h-[100dvh]">
      {/* Header Area */}
      <header className="flex items-center justify-between border-4 border-retro-brown bg-cozy-beige px-3 py-2.5 sm:px-4 sm:py-3 shadow-[4px_4px_0px_var(--color-retro-brown)]">
        {/* Sunflower Sprite */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 select-none">
          <Image
            src="/sunflower.png"
            alt="Sunflower"
            fill
            className="object-contain mix-blend-multiply"
            unoptimized
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center flex flex-col items-center">
          <h1 className="font-press-start text-xs sm:text-sm tracking-tighter text-retro-brown">
            SAUMYA'S WORDLE
          </h1>
          <span className="font-vt323 text-xs sm:text-sm text-retro-brown-light font-bold mt-1 tracking-wide uppercase">
            Daily Ritual • Level {dateStr}
          </span>
        </div>

        {/* Matcha Cup Sprite */}
        <div className="relative w-11 h-11 sm:w-13 sm:h-13 select-none">
          <Image
            src="/matcha_cup.png"
            alt="Matcha Cup"
            fill
            className="object-contain mix-blend-multiply"
            unoptimized
            priority
          />
        </div>
      </header>

      {/* Grid container */}
      <main className="flex-1 flex flex-col justify-center my-2 sm:my-4 relative">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          colors={colors}
          currentRowIndex={guesses.length}
          isRevealingRow={isRevealingRow}
          shakeRowIndex={shakeRowIndex}
        />

        {/* Toast Alerts */}
        {toastMessage && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-retro-brown text-cozy-cream px-4 py-3 border-4 border-retro-brown shadow-[4px_4px_0px_rgba(0,0,0,0.25)] rounded flex items-center justify-center font-press-start text-[10px] sm:text-xs">
            {toastMessage}
          </div>
        )}
      </main>

      {/* Virtual Keyboard */}
      <div className="mt-auto">
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          charStatuses={getCharStatuses()}
        />

        {/* Footnote */}
        <div className="text-center text-[10px] sm:text-xs text-retro-brown-light/60 font-mono mt-3">
          Made with love & matcha 🍵 • Next level at midnight
        </div>
      </div>

      {/* Daily Affirmation Modal */}
      <AffirmationModal
        isOpen={showModal}
        isWin={gameStatus === 'WON'}
        guesses={guesses}
        colors={colors}
        dateStr={dateStr}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
