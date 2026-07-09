'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SpriteProps {
  src: string;
  alt: string;
  size: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

function FloatingSprite({ src, alt, size, left, top, delay, duration }: SpriteProps) {
  // Simple floating drift: gentle translation and slight rotation (no scaling or stretching)
  const animateSettings = {
    y: [0, -20, 20, 0],
    x: [0, 12, -12, 0],
    rotate: [0, 6, -6, 0],
  };

  const transitionSettings = {
    duration: duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: delay,
  };

  return (
    <motion.div
      className="absolute opacity-40"
      style={{
        left,
        top,
        width: size,
        height: size,
      }}
      animate={animateSettings}
      transition={transitionSettings}
    >
      <div className="relative w-full h-full">
        {/* We append a cache-busting query parameter '?v=2' to force browsers to load the transparent assets */}
        <Image
          src={`${src}?v=2`}
          alt={alt}
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>
    </motion.div>
  );
}

export function FloatingSprites() {
  const spriteList = [
    // Left Side Assets
    {
      id: 1,
      src: '/frog_lilypad.png',
      alt: 'Frog',
      size: 70,
      left: '4%',
      top: '18%',
      duration: 9,
      delay: 0,
    },
    {
      id: 2,
      src: '/matcha_cup.png',
      alt: 'Matcha',
      size: 55,
      left: '8%',
      top: '52%',
      duration: 11,
      delay: 1.5,
    },
    {
      id: 3,
      src: '/sunflower.png',
      alt: 'Sunflower',
      size: 60,
      left: '3%',
      top: '80%',
      duration: 10,
      delay: 0.8,
    },
    // Right Side Assets
    {
      id: 4,
      src: '/sunflower.png',
      alt: 'Sunflower',
      size: 65,
      left: '88%',
      top: '15%',
      duration: 11,
      delay: 3,
    },
    {
      id: 5,
      src: '/frog_lilypad.png',
      alt: 'Frog',
      size: 65,
      left: '85%',
      top: '48%',
      duration: 9.5,
      delay: 1.6,
    },
    {
      id: 6,
      src: '/matcha_cup.png',
      alt: 'Matcha',
      size: 50,
      left: '89%',
      top: '76%',
      duration: 12,
      delay: 0.2,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none hidden md:block">
      {spriteList.map((sprite) => (
        <FloatingSprite
          key={sprite.id}
          src={sprite.src}
          alt={sprite.alt}
          size={sprite.size}
          left={sprite.left}
          top={sprite.top}
          delay={sprite.delay}
          duration={sprite.duration}
        />
      ))}
    </div>
  );
}
