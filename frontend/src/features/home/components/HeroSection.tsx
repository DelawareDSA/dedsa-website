'use client';

import Blob from '@/core/components/ui/Blob';
import ConfettiButton from '@/core/components/ui/Confetti';
import { contentService } from '@/core/services/contentService';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Inline cast

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
      <div className="absolute inset-0 z-0 bg-gradient-animated" />
      <div className="absolute inset-0 z-10 bg-black bg-opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diag"
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
                strokeOpacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>
      </div>

      {ready && (
        <>
          <Blob
            color="rgba(236,31,39,0.15)"
            className="top-[10%] right-[10%] z-10"
            size="300px"
          />
          <Blob
            color="rgba(236,31,39,0.1)"
            className="bottom-[20%] left-[5%] z-10"
            size="400px"
          />
          <motion.div
            className="absolute top-[30%] right-[30%] rotate-12 z-10 w-20 h-20 bg-white opacity-5 rounded"
            animate={{ rotate: [12, -12, 12], y: [0, 20, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </>
      )}

      <div className="relative z-20 container-page" ref={ref}>
        {ready && (
          <motion.div
            className="max-w-3xl"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h1
              className="mb-4 text-4xl font-bold font-styrene md:text-7xl text-dsa-black tracking-display"
              variants={item}
            >
              <span className="relative z-10">{c.mainHeading}</span>
              <motion.span
                className="absolute left-0 z-0 h-4 -bottom-2 bg-dsa-red"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.h1>

            <motion.div variants={item}>
              <h2 className="mb-6 text-2xl font-black font-manifold md:text-3xl text-dsa-black tracking-heading">
                {c.subHeading}
              </h2>
            </motion.div>

            <motion.p
              className="mb-2 text-xl text-on-accent opacity-90"
              variants={item}
            >
              {c.tagline}
            </motion.p>

            <motion.p
              className="mb-8 text-xl leading-relaxed text-on-accent"
              variants={item}
            >
              {c.description.split('.').map(
                (s, i) =>
                  s.trim() && (
                    <React.Fragment key={i}>
                      {s.trim()}.<br />
                    </React.Fragment>
                  )
              )}
            </motion.p>

            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
              variants={item}
            >
              <ConfettiButton className="font-medium transition transform bg-white btn text-dsa-red hover:bg-dsa-red-t4 hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50 animation-pulse">
                <Link href={c.buttons.primary.href}>
                  {c.buttons.primary.text}
                </Link>
              </ConfettiButton>
              <Link
                href={c.buttons.secondary.href}
                className="font-medium transition border-2 border-white btn text-on-accent hover:bg-white hover:text-dsa-red"
              >
                {c.buttons.secondary.text}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
