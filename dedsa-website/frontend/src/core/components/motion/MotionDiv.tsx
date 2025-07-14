'use client';

import { motion, MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';

type MotionDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'
> &
  MotionProps;

export default function MotionDiv({ children, ...props }: MotionDivProps) {
  return <motion.div {...props}>{children}</motion.div>;
}
