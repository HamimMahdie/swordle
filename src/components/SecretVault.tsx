'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface VaultEntry {
  date: string;
  word: string;
  affirmation: string;
  vaultNumber?: number;
}

interface MonthGroup {
  label: string;
  emoji: string;
  entries: VaultEntry[];
}

interface SecretVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

const VAULT_PASSWORD = 'krispykremeenthusiast';

const MONTH_EMOJIS: Record<string, string> = {
  '01': '❄️', '02': '💕', '03': '🌱', '04': '🌸',
  '05': '🌷', '06': '☀️', '07': '🌻', '08': '🍵',
  '09': '🍂', '10': '🎃', '11': '🍁', '12': '🎄',
};

const MONTH_NAMES: Record<string, string> = {
  '01': 'JANUARY', '02': 'FEBRUARY', '03': 'MARCH', '04': 'APRIL',
  '05': 'MAY', '06': 'JUNE', '07': 'JULY', '08': 'AUGUST',
  '09': 'SEPTEMBER', '10': 'OCTOBER', '11': 'NOVEMBER', '12': 'DECEMBER',
};

function groupByMonth(entries: VaultEntry[]): MonthGroup[] {
  const groups: Record<string, VaultEntry[]> = {};

  for (const entry of entries) {
    const [year, month] = entry.date.split('-');
    const key = `${year}-${month}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }

  // Sort keys chronologically
  const sortedKeys = Object.keys(groups).sort();

  return sortedKeys.map((key) => {
    const [year, month] = key.split('-');
    return {
      label: `${MONTH_NAMES[month] || month} ${year}`,
      emoji: MONTH_EMOJIS[month] || '✨',
      entries: groups[key].sort((a, b) => a.date.localeCompare(b.date)),
    };
  });
}

function numberEntries(entries: VaultEntry[]): VaultEntry[] {
  // Sort chronologically and assign sequential numbers with no gaps
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map((entry, idx) => ({ ...entry, vaultNumber: idx + 1 }));
}

export function SecretVault({ isOpen, onClose }: SecretVaultProps) {
  const [phase, setPhase] = useState<'password' | 'vault'>('password');
  const [password, setPassword] = useState('');
  const [rejected, setRejected] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when vault opens
  useEffect(() => {
    if (isOpen) {
      setPhase('password');
      setPassword('');
      setRejected(false);
      setRedFlash(false);
      // Focus the input after a short delay for the animation
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === VAULT_PASSWORD) {
      // Success — fetch vault data (only entries before today)
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      fetch(`/api/vault?before=${todayStr}`)
        .then((res) => res.json())
        .then((data) => {
          setEntries(numberEntries(data.entries || []));
          setLoading(false);
          setPhase('vault');
        })
        .catch((err) => {
          console.error('Failed to load vault:', err);
          setLoading(false);
        });
    } else {
      // Wrong password — dramatic rejection
      setRejected(true);
      setRedFlash(true);
      setTimeout(() => setRejected(false), 700);
      setTimeout(() => setRedFlash(false), 900);
      setPassword('');
    }
  };

  const monthGroups = groupByMonth(entries);

  // Overlay + modal animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const gateVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 18, delay: 0.1 },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  const vaultVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 180, damping: 20 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${redFlash ? 'animate-red-flash' : ''}`} />

          <AnimatePresence mode="wait">
            {phase === 'password' && (
              <motion.div
                key="password-gate"
                variants={gateVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative z-10 w-full max-w-md mx-4 crt-overlay"
              >
                {/* Password Gate Container */}
                <div className="bg-retro-brown-dark border-4 border-retro-brown shadow-[8px_8px_0px_rgba(0,0,0,0.4)] p-8 flex flex-col items-center text-center">
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 font-press-start text-xs text-cozy-cream/50 hover:text-cozy-cream transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  {/* Header */}
                  <h2 className="font-press-start text-sm sm:text-base text-cozy-cream animate-gate-flicker mb-2 tracking-wide">
                    WHO GOES THERE?
                  </h2>
                  <div className="font-vt323 text-cozy-cream/40 text-sm mb-6 tracking-wider">
                    ENTER THE SECRET PASSPHRASE
                  </div>

                  {/* Password form */}
                  <form onSubmit={handlePasswordSubmit} className="w-full">
                    <div className={`${rejected ? 'animate-vault-reject' : ''}`}>
                      <input
                        ref={inputRef}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="• • • • • • • •"
                        className="vault-input w-full bg-black/40 text-cozy-cream font-vt323 text-lg sm:text-xl px-4 py-3 border-4 border-retro-brown outline-none text-center tracking-widest placeholder:text-cozy-cream/20"
                        autoComplete="off"
                        spellCheck={false}
                        disabled={loading}
                      />
                    </div>

                    {/* Rejection message */}
                    <AnimatePresence>
                      {rejected && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 font-press-start text-[10px] sm:text-xs text-red-400 tracking-wide"
                        >
                          ⚔️ YOU SHALL NOT ENTER ⚔️
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={loading || !password}
                      className="retro-button w-full mt-5 py-3 px-4 font-press-start text-[10px] sm:text-xs bg-retro-brown-light text-cozy-cream uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? 'UNLOCKING...' : 'ATTEMPT ENTRY'}
                    </button>
                  </form>

                  {/* Subtle CRT glow at the bottom */}
                  <div className="mt-6 font-vt323 text-[10px] text-cozy-cream/20 tracking-widest">
                    🔒 AUTHORIZED PERSONNEL ONLY 🔒
                  </div>
                </div>

                {/* Erica waving on the right side */}
                <div className="absolute -bottom-6 -right-20 sm:-right-24 w-28 h-28 sm:w-36 sm:h-36 z-20 animate-erica-wave pointer-events-none">
                  <Image
                    src="/erica_bear.png"
                    alt="Erica the Bear waving"
                    fill
                    className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    unoptimized
                  />
                </div>
              </motion.div>
            )}

            {phase === 'vault' && (
              <motion.div
                key="vault-view"
                variants={vaultVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-lg mx-4 max-h-[90vh] flex flex-col"
              >
                {/* Vault Container */}
                <div className="bg-cozy-cream border-4 border-retro-brown shadow-[8px_8px_0px_var(--color-retro-brown)] flex flex-col max-h-[90vh] overflow-hidden">
                  {/* Vault Header — fixed at top */}
                  <div className="bg-retro-brown text-cozy-cream px-4 py-3 flex items-center justify-between flex-shrink-0">
                    <h2 className="font-press-start text-[10px] sm:text-xs uppercase tracking-wider">
                      🔐 SAMMY&apos;S SECRET VAULT
                    </h2>
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-press-start text-[10px] text-cozy-cream/60 hover:text-cozy-cream transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Vault subtitle */}
                  <div className="bg-cozy-beige border-b-4 border-retro-brown px-4 py-2 flex-shrink-0">
                    <div className="font-vt323 text-sm text-retro-brown-light text-center tracking-wide">
                      EVERY WORD • EVERY AFFIRMATION • EVERY MEMORY
                    </div>
                  </div>

                  {/* Scrollable content */}
                  <div className="overflow-y-auto flex-1 p-4 space-y-6">
                    {monthGroups.map((group) => (
                      <div key={group.label}>
                        {/* Month Ribbon Header */}
                        <div className="bg-retro-brown text-cozy-cream px-4 py-2 border-2 border-retro-brown shadow-[3px_3px_0px_rgba(0,0,0,0.15)] mb-3">
                          <h3 className="font-press-start text-[9px] sm:text-[10px] uppercase tracking-wider">
                            {group.emoji} {group.label}
                          </h3>
                        </div>

                        {/* Entry Cards */}
                        <div className="space-y-3">
                          {group.entries.map((entry, idx) => (
                            <div
                              key={entry.date}
                              className="animate-vault-card bg-cozy-beige border-4 border-retro-brown p-4 shadow-[3px_3px_0px_var(--color-retro-brown)]"
                              style={{ animationDelay: `${idx * 60}ms` }}
                            >
                              {/* Number & Word row */}
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-press-start text-[10px] text-retro-brown-light tracking-wide">
                                  #{entry.vaultNumber}
                                </span>
                                <span className="font-press-start text-xs sm:text-sm text-retro-brown tracking-widest">
                                  {entry.word}
                                </span>
                              </div>
                              {/* Divider */}
                              <div className="border-t-2 border-retro-brown/20 mb-2" />
                              {/* Affirmation */}
                              <div className="font-vt323 text-base sm:text-lg text-retro-brown leading-relaxed">
                                &ldquo;{entry.affirmation}&rdquo;
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Bottom spacer & back button */}
                    <div className="pt-2 pb-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="retro-button w-full py-3 px-4 font-press-start text-[10px] sm:text-xs bg-matcha hover:bg-matcha-light text-white uppercase cursor-pointer"
                      >
                        BACK TO GAME
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
