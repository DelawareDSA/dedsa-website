'use client';

import Blob from '@/core/components/ui/Blob';
import ConfettiButton from '@/core/components/ui/Confetti';
import { contentService } from '@/core/services/contentService';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { HomePageContent } from '@/core/types/pages/home';

const homeContent = contentService.getPageContent('home') as HomePageContent;
const c = homeContent.heroSection;

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    setReady(true);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative flex items-center min-h-screen py-20 overflow-hidden md:py-28">
      {/* Enhanced Background with Better Colors */}
      <div className="absolute inset-0 z-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800" />

        {/* Secondary overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 via-transparent to-red-900/30" />

        {/* Subtle animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-700/60 to-red-800/80 animate-pulse"
          style={{
            background:
              'linear-gradient(45deg, #dc2626, #b91c1c, #991b1b, #7f1d1d)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 8s ease infinite',
          }}
        />
      </div>

      {/* Enhanced Pattern Overlay */}
      <div className="absolute inset-0 z-10 bg-black/10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* More subtle diagonal pattern */}
            <pattern
              id="diag"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(30)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="20"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.1"
              />
            </pattern>

            {/* Dot pattern for texture */}
            <pattern
              id="dots"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="15" cy="15" r="1" fill="white" fillOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Enhanced Floating Elements */}
      {ready && (
        <>
          {/* Main accent blob - positioned higher */}
          <Blob
            color="rgba(255,255,255,0.08)"
            className="top-[15%] right-[15%] z-15"
            size="350px"
          />

          {/* Secondary blob - better positioning */}
          <Blob
            color="rgba(255,255,255,0.05)"
            className="bottom-[25%] left-[8%] z-15"
            size="280px"
          />

          {/* Animated geometric shapes */}
          <motion.div
            className="absolute top-[20%] right-[25%] z-15 w-24 h-24 border-2 border-white/20 rounded-lg"
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-[30%] right-[10%] z-15 w-16 h-16 bg-white/10 rounded-full"
            animate={{
              x: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />

          {/* Additional accent elements */}
          <motion.div
            className="absolute top-[40%] left-[5%] z-15 w-32 h-1 bg-white/20 rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-20 container-page" ref={ref}>
        {ready && (
          <motion.div
            className="max-w-4xl"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Enhanced Main Heading */}
            <motion.h1
              className="mb-6 text-5xl font-bold leading-tight text-white font-styrene md:text-8xl tracking-display"
              variants={item}
            >
              <span className="relative z-10 block">
                {c.mainHeading}
                {/* Enhanced underline accent */}
                <motion.span
                  className="absolute left-0 z-0 h-6 rounded-full -bottom-3 bg-white/30"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                />
              </span>
            </motion.h1>

            {/* Enhanced Subheading */}
            <motion.div variants={item}>
              <h2 className="mb-8 text-2xl font-black leading-relaxed font-manifold md:text-4xl text-white/95 tracking-heading">
                {c.subHeading}
              </h2>
            </motion.div>

            {/* Enhanced Tagline */}
            <motion.p
              className="mb-4 text-xl font-medium md:text-2xl text-white/90"
              variants={item}
            >
              {c.tagline}
            </motion.p>

            {/* Enhanced Description */}
            <motion.p
              className="max-w-3xl mb-10 text-lg leading-relaxed md:text-xl text-white/85"
              variants={item}
            >
              {c.description.split('.').map(
                (s, i) =>
                  s.trim() && (
                    <React.Fragment key={i}>
                      {s.trim()}.<br className="hidden md:block" />
                    </React.Fragment>
                  )
              )}
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
              variants={item}
            >
              <ConfettiButton
                href={c.buttons.primary.href}
                className="px-8 py-4 text-lg font-bold text-red-700 transition-all transform bg-white rounded-lg shadow-xl hover:bg-red-50 hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-white/50"
              >
                {c.buttons.primary.text}
              </ConfettiButton>

              <Link
                href={c.buttons.secondary.href}
                className="px-8 py-4 text-lg font-semibold text-white transition-all border-2 rounded-lg border-white/80 hover:bg-white hover:text-red-700 hover:border-white hover:shadow-xl backdrop-blur-sm"
              >
                {c.buttons.secondary.text}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
