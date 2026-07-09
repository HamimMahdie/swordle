'use client';

import React from 'react';
import { motion } from 'framer-motion';

type TileStatus = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

interface TileProps {
  letter: string;
  status: TileStatus;
  isCompleted: boolean;
  revealDelay: number;
  isRevealing: boolean;
}

export function Tile({ letter, status, isCompleted, revealDelay, isRevealing }: TileProps) {
  // Determine tile classes based on status
  let tileClass = 'retro-tile ';
  if (isCompleted && !isRevealing) {
    if (status === 'correct') tileClass += 'retro-tile-correct';
    else if (status === 'present') tileClass += 'retro-tile-present';
    else if (status === 'absent') tileClass += 'retro-tile-absent';
  } else {
    tileClass += 'bg-cozy-cream text-retro-brown ';
    if (letter) {
      tileClass += 'border-retro-brown scale-100 ';
    } else {
      tileClass += 'border-retro-brown/40 ';
    }
  }

  // Define framer motion animations
  // A rigid, retro step-based card-flip
  const flipVariants = {
    hidden: { rotateX: 0 },
    flip: {
      rotateX: [0, 90, 180, 180],
      transition: {
        duration: 0.5,
        delay: revealDelay,
        times: [0, 0.5, 0.51, 1], // flip halfway, swap status, finish flip
        ease: 'easeInOut' as const,
      },
    },
  };

  // Bounce scale animation when a letter is entered
  const bounceVariants = {
    initial: { scale: 1 },
    bounce: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 0.12,
        ease: 'easeOut' as const,
      },
    },
  };

  const isFlipped = isCompleted && isRevealing;

  return (
    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 perspective-1000 relative">
      <motion.div
        variants={flipVariants}
        animate={isFlipped ? 'flip' : 'hidden'}
        className="w-full h-full"
      >
        <motion.div
          variants={bounceVariants}
          animate={letter && !isCompleted ? 'bounce' : 'initial'}
          key={letter} // trigger animation on letter change
          className={`w-full h-full flex items-center justify-center text-xl xs:text-2xl sm:text-3xl font-press-start font-bold uppercase roundedselect-none ${tileClass}`}
          style={{
            // Keep text right-side up during vertical rotation
            transform: isFlipped ? 'rotateX(180deg)' : 'none',
          }}
        >
          {letter}
        </motion.div>
      </motion.div>
    </div>
  );
}

interface RowProps {
  guess: string;
  colors?: ('correct' | 'present' | 'absent')[];
  isCompleted: boolean;
  isRevealing: boolean;
}

export function Row({ guess, colors, isCompleted, isRevealing }: RowProps) {
  const letters = guess.padEnd(5, ' ').split('');

  return (
    <div className="flex justify-center gap-1.5 xs:gap-2">
      {letters.map((letter, i) => {
        let status: TileStatus = 'empty';
        if (isCompleted) {
          status = colors ? colors[i] : 'absent';
        } else if (letter.trim()) {
          status = 'tbd';
        }

        return (
          <Tile
            key={i}
            letter={letter.trim()}
            status={status}
            isCompleted={isCompleted}
            revealDelay={i * 0.15} // Staggered flips
            isRevealing={isRevealing}
          />
        );
      })}
    </div>
  );
}

interface GridProps {
  guesses: string[];
  currentGuess: string;
  colors: ('correct' | 'present' | 'absent')[][];
  currentRowIndex: number;
  isRevealingRow: boolean;
  shakeRowIndex: number | null;
}

export function Grid({
  guesses,
  currentGuess,
  colors,
  currentRowIndex,
  isRevealingRow,
  shakeRowIndex,
}: GridProps) {
  const rows = Array(6).fill(null);

  return (
    <div className="grid grid-rows-6 gap-1.5 xs:gap-2 py-4 max-w-[350px] mx-auto w-full px-2">
      {rows.map((_, i) => {
        const isCompleted = i < guesses.length;
        const isCurrent = i === guesses.length;
        const guessString = isCompleted ? guesses[i] : isCurrent ? currentGuess : '';
        const isRevealing = isCurrent && isRevealingRow; // Row being processed and flipped
        const shouldShake = shakeRowIndex === i;

        return (
          <div key={i} className={shouldShake ? 'animate-shake' : ''}>
            <Row
              guess={guessString}
              colors={isCompleted ? colors[i] : undefined}
              isCompleted={isCompleted || isRevealing}
              isRevealing={isRevealing}
            />
          </div>
        );
      })}
    </div>
  );
}
