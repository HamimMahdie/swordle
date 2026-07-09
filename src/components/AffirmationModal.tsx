'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateShareText } from '@/utils/share';
import Image from 'next/image';

interface AffirmationModalProps {
  isOpen: boolean;
  isWin: boolean;
  guesses: string[];
  colors: ('correct' | 'present' | 'absent')[][];
  dateStr: string;
  onClose: () => void;
}

export function AffirmationModal({ isOpen, isWin, guesses, colors, dateStr, onClose }: AffirmationModalProps) {
  const [affirmation, setAffirmation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (isWin) {
        // Fetch daily affirmation from secure API
        fetch(`/api/affirmation?date=${dateStr}`)
          .then((res) => res.json())
          .then((data) => {
            setAffirmation(data.affirmation || "You're doing amazing! Keep leaping forward today.");
            setLoading(false);
          })
          .catch((err) => {
            console.error('Error loading affirmation:', err);
            setAffirmation("You're doing amazing! Keep leaping forward today.");
            setLoading(false);
          });
      } else {
        setAffirmation('Aww, nice try! Remember that even sunflowers have rainy days. Make sure to get some rest and try again tomorrow!');
        setLoading(false);
      }
    }
  }, [isOpen, isWin, dateStr]);

  const handleShare = () => {
    const text = generateShareText(dateStr, colors, guesses.length, isWin);
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text:', err);
      });
  };

  // Backdrop/overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Modal scale bounce animation
  const modalVariants = {
    hidden: { scale: 0.8, y: 50, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-md bg-cozy-cream border-4 border-retro-brown shadow-[8px_8px_0px_var(--color-retro-brown)] p-6 z-10 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Retro Ribbon Header */}
            <div className="bg-retro-brown text-cozy-cream px-4 py-2 border-2 border-retro-brown shadow-[4px_4px_0px_rgba(0,0,0,0.15)] mb-4 w-full">
              <h2 className="font-press-start text-xs sm:text-sm uppercase tracking-wider">
                {isWin ? '🐸 LILYPAD COMPLETED!' : '🌻 NEXT TIME!'}
              </h2>
            </div>

            {/* Sprite Image Container */}
            <div className="my-2 p-3 bg-cozy-beige border-4 border-retro-brown rounded relative w-32 h-32 flex items-center justify-center">
              <Image
                src={isWin ? '/frog_lilypad.png?v=2' : '/sunflower.png?v=2'}
                alt={isWin ? 'Frog' : 'Sunflower'}
                fill
                className="object-contain p-2 mix-blend-multiply"
                unoptimized
                priority
              />
            </div>

            {/* Game Stats */}
            <div className="font-press-start text-[10px] sm:text-xs text-retro-brown-light my-2">
              Level {dateStr} • Attempt {guesses.length}/6
            </div>

            {/* Daily Affirmation Display */}
            <div className="w-full bg-cozy-beige border-4 border-retro-brown p-4 my-3 text-left relative shadow-inner">
              {/* Retro quotation mark */}
              <div className="font-press-start text-retro-brown/25 text-3xl absolute top-0 left-2">“</div>
              <div className="pl-6 pr-2 pt-2 text-base sm:text-lg text-retro-brown leading-relaxed font-semibold">
                {loading ? (
                  <span className="animate-pulse">Loading daily affirmation...</span>
                ) : (
                  affirmation
                )}
              </div>
              <div className="font-press-start text-retro-brown/25 text-3xl absolute bottom-0 right-2">”</div>
            </div>

            {/* Interactive Control Buttons */}
            <div className="flex flex-col gap-3 w-full mt-4">
              <button
                type="button"
                onClick={handleShare}
                className="retro-button w-full py-3 px-4 font-press-start text-[10px] sm:text-xs bg-matcha hover:bg-matcha-light text-white font-bold cursor-pointer uppercase flex items-center justify-center gap-2"
              >
                {copied ? (
                  <span className="scale-110 text-cozy-beige animate-bounce">COPIED TO CLIPBOARD!</span>
                ) : (
                  <span>SHARE COZY GRID (ASCII)</span>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="retro-button w-full py-3 px-4 font-press-start text-[10px] sm:text-xs bg-cozy-beige text-retro-brown font-bold cursor-pointer uppercase"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
