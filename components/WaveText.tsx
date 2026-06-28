'use client';

import { useState } from 'react';
import { motion, type Easing } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = '' }: WaveTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const characterVariants = {
    hidden: { rotateY: 0, color: 'currentColor' },
    visible: {
      rotateY: 360,
      transition: {
        duration: 0.4,
        ease: 'easeInOut' as Easing,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex ${className} cursor-[url('https://cdn.cursors-4u.net/previews/tiny-finger-point-c1336353-32.webp')_32_32,auto]`}
      variants={containerVariants}
      initial="hidden"
      animate={isHovered ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '500px' }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterVariants}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}