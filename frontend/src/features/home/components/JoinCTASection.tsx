'use client';

import ConfettiButton from '@/core/components/ui/Confetti';
import joinCTAContent from '@/core/content/pages/home.json';
import { JoinCTASectionContent } from '@/core/types/pages/home';
import { motion, useAnimation, type Variants } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Type assertion for the imported JSON
const typedJoinCTAContent =
  joinCTAContent.joinCTASection as JoinCTASectionContent;

export default function JoinCTASection() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  // Animated diagonal line pattern
  const linePatternVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: { duration: 2 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative py-20 overflow-hidden bg-gradient-animated text-on-accent"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 flex justify-center"
        variants={linePatternVariants}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diagonalHatch"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center container-page">
        <motion.h2
          className="mb-4 text-4xl font-bold md:text-5xl text-on-accent"
          variants={itemVariants}
        >
          {typedJoinCTAContent.heading}
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto mb-8 text-xl text-on-accent"
          variants={itemVariants}
        >
          {typedJoinCTAContent.description}
        </motion.p>
        <motion.div variants={itemVariants}>
          <ConfettiButton
            href={typedJoinCTAContent.buttonHref}
            className="px-8 py-3 text-lg font-medium transition-all duration-300 ease-in-out transform bg-white shadow-lg btn text-dsa-red hover:bg-dsa-red-t4 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            {typedJoinCTAContent.buttonText}
          </ConfettiButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
