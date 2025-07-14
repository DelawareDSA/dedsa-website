'use client';

import Blob from '@/core/components/ui/Blob';
import homeJson from '@/core/content/pages/home.json';
import { StrategicPrioritiesSectionContent } from '@/core/types/pages/home';
import { useTypewriterEffect } from '@/core/utils/animations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const c =
  homeJson.strategicPrioritiesSection as StrategicPrioritiesSectionContent;

export default function StrategicPrioritiesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const fontWeight = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [400, 600, 800]
  );
  const { displayText } = useTypewriterEffect(c.heading, 100);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-dsa-red-t4">
      {}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dot"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot)" />
        </svg>
      </div>

      {}
      <Blob
        color="rgba(236,31,39,0.05)"
        className="top-[10%] left-[5%]"
        size="500px"
      />
      <Blob
        color="rgba(236,31,39,0.03)"
        className="bottom-[5%] right-[5%]"
        size="400px"
      />

      <div className="relative z-10 container-page">
        <motion.h2
          className="mb-2 text-3xl font-bold text-center md:text-5xl text-heading"
          style={{ fontVariationSettings: `'wght' ${fontWeight.get()}` }}
        >
          {displayText}
        </motion.h2>
        <p className="mb-12 text-lg text-center text-secondary">{c.subtitle}</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {c.priorities.map((p, i) => (
            <motion.div
              key={p.title}
              className="relative p-8 overflow-hidden transition-all duration-500 bg-white border-l-4 shadow-md group rounded-xl hover:shadow-lg border-dsa-red"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="absolute w-40 h-40 transition-opacity duration-500 ease-in-out rounded-full opacity-0 -right-20 -bottom-20 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle,rgba(236,31,39,0.1) 0%,rgba(255,255,255,0) 70%)',
                }}
              />

              <div className="relative z-10 flex items-start mb-4">
                <motion.div
                  className="p-3 mr-4 transition-colors duration-300 rounded-full bg-red-50 group-hover:bg-red-100"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-300 text-dsa-red group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    aria-label={`${p.title} campaign icon`}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={p.iconPath}
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold transition-colors duration-300 text-card-title group-hover:text-dsa-red">
                  {p.title}
                </h3>
              </div>

              <p className="relative z-10 pl-12 transition-all duration-300 text-card-body">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={c.linkHref}
            className="inline-flex items-center font-medium text-link hover:underline group"
          >
            <span>{c.linkText}</span>
            <motion.svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 1.5,
                repeatDelay: 1,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
