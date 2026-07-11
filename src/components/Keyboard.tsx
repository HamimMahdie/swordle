'use client';

import React from 'react';

interface KeyboardProps {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  charStatuses: Record<string, 'correct' | 'present' | 'absent'>;
}

export function Keyboard({ onChar, onDelete, onEnter, charStatuses }: KeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  const getKeyClass = (key: string) => {
    let baseClass = 'retro-button flex items-center justify-center font-press-start font-bold uppercase select-none rounded cursor-pointer transition-all duration-75 active:scale-95 ';
    
    // Width classes
    if (key === 'ENTER') {
      baseClass += 'px-1.5 py-3 text-[10px] sm:text-xs min-w-[50px] sm:min-w-[65px] h-12 ';
    } else if (key === 'DEL') {
      baseClass += 'px-1.5 py-3 text-[10px] sm:text-xs min-w-[50px] sm:min-w-[65px] h-12 ';
    } else {
      baseClass += 'w-8 h-12 sm:w-10 sm:h-12 text-xs sm:text-sm ';
    }

    // Color feedback classes
    const status = charStatuses[key];
    if (status === 'correct') {
      baseClass += 'retro-key-correct bg-matcha text-white border-retro-brown shadow-[2px_2px_0px_var(--color-retro-brown)] active:shadow-none';
    } else if (status === 'present') {
      baseClass += 'retro-key-present bg-sunflower text-retro-brown border-retro-brown shadow-[2px_2px_0px_var(--color-retro-brown)] active:shadow-none';
    } else if (status === 'absent') {
      baseClass += 'retro-key-absent bg-retro-brown-light text-cozy-beige border-retro-brown shadow-[2px_2px_0px_var(--color-retro-brown-dark)] active:shadow-none';
    } else {
      baseClass += 'bg-cozy-beige text-retro-brown border-retro-brown shadow-[2px_2px_0px_var(--color-retro-brown)] active:shadow-none';
    }

    return baseClass;
  };

  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'DEL') {
      onDelete();
    } else {
      onChar(key);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto px-1 sm:px-4 py-2 flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 w-full">
          {row.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKeyClick(key)}
              className={getKeyClass(key)}
            >
              {key === 'DEL' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
