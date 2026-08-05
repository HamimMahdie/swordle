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
  // Gentle, local drifting (no screen-wide wandering)
  const animateSettings = {
    y: [0, -18, 18, 0],
    x: [0, 8, -8, 0],
    rotate: [0, 5, -5, 0],
  };

  const transitionSettings = {
    duration: duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: delay,
  };

  return (
    <motion.div
      // opacity-15 on mobile, opacity-35 on desktop to keep it subtle behind text
      className="absolute opacity-15 md:opacity-35"
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
    // Left Side Margin Sprites (6 assets)
    {
      id: 1,
      src: '/frog_lilypad.png',
      alt: 'Frog',
      size: 70,
      left: '4%',
      top: '8%',
      duration: 8,
      delay: 0,
    },
    {
      id: 2,
      src: '/matcha_cup.png',
      alt: 'Matcha',
      size: 65,
      left: '7%',
      top: '25%',
      duration: 10,
      delay: 1.5,
    },
    {
      id: 3,
      src: '/pumpkin.png',
      alt: 'Pumpkin',
      size: 60,
      left: '3%',
      top: '42%',
      duration: 9,
      delay: 0.8,
    },
    {
      id: 4,
      src: '/water_lily.png',
      alt: 'Water Lily',
      size: 65,
      left: '8%',
      top: '58%',
      duration: 10.5,
      delay: 1.8,
    },
    {
      id: 5,
      src: '/sunflower.png',
      alt: 'Sunflower',
      size: 62,
      left: '6%',
      top: '75%',
      duration: 11,
      delay: 2.2,
    },
    {
      id: 6,
      src: '/frog_lilypad.png',
      alt: 'Frog',
      size: 60,
      left: '4%',
      top: '90%',
      duration: 8.5,
      delay: 0.4,
    },
    // Right Side Margin Sprites (6 assets)
    {
      id: 7,
      src: '/sunflower.png',
      alt: 'Sunflower',
      size: 65,
      left: '88%',
      top: '8%',
      duration: 11,
      delay: 3,
    },
    {
      id: 8,
      src: '/frog_lilypad.png',
      alt: 'Frog',
      size: 65,
      left: '85%',
      top: '25%',
      duration: 9.5,
      delay: 1.6,
    },
    {
      id: 9,
      src: '/matcha_cup.png',
      alt: 'Matcha',
      size: 60,
      left: '89%',
      top: '42%',
      duration: 11,
      delay: 0.2,
    },
    {
      id: 10,
      src: '/water_lily.png',
      alt: 'Water Lily',
      size: 65,
      left: '84%',
      top: '58%',
      duration: 10,
      delay: 2.4,
    },
    {
      id: 11,
      src: '/pumpkin.png',
      alt: 'Pumpkin',
      size: 58,
      left: '86%',
      top: '75%',
      duration: 10,
      delay: 1.2,
    },
    {
      id: 12,
      src: '/sunflower.png',
      alt: 'Sunflower',
      size: 60,
      left: '88%',
      top: '90%',
      duration: 12,
      delay: 0.6,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none block">
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
