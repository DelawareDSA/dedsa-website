'use client';

import { motion, type MotionProps } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type GlowButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'
> &
  MotionProps & {
    children: ReactNode;
  };

export default function GlowButton({ children, ...props }: GlowButtonProps) {
  return (
    <motion.button
      {...props}
      whileHover={{ boxShadow: '0 0 20px #EC1F27' }}
      className={`px-6 py-3 rounded-lg ${props.className ?? ''}`.trim()}
    >
      {children}
    </motion.button>
  );
}
