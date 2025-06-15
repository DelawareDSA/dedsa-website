'use client';

import homeJson from '@/core/content/pages/home.json';
import { MissionSectionContent } from '@/core/types/pages/home';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

// Inline cast so we can drop a separate typed variable
const m = homeJson.missionSection as MissionSectionContent;

// Config for the two background circles
const bgConfigs: Array<{ cl: string; range: [number, number] }> = [
  {
    cl: 'absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-red-50',
    range: [0, -100] as [number, number],
  },
  {
    cl: 'absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-red-50',
    range: [100, 0] as [number, number],
  },
];

// Separate component for background blobs to properly use hooks
// Fixed AnimatedBlob component with proper types
function AnimatedBlob({
  scrollYProgress,
  opacity,
  config,
  index,
}: {
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  config: { cl: string; range: [number, number] };
  index: number;
}) {
  const y = useTransform(scrollYProgress, [0, 1], config.range);

  return (
    <motion.div
      key={index}
      className={config.cl}
      style={{
        y,
        opacity,
      }}
    />
  );
}

export default function MissionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        {bgConfigs.map((config, i) => (
          <AnimatedBlob
            key={i}
            scrollYProgress={scrollYProgress}
            opacity={opacity}
            config={config}
            index={i}
          />
        ))}
      </div>

      <div className="container-page">
        <div className="flex flex-col max-w-5xl mx-auto md:flex-row md:items-center md:space-x-12">
          <motion.div
            className="mb-8 md:w-1/2 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="mb-6 text-3xl font-bold font-manifold md:text-5xl text-dsa-black tracking-heading"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="relative inline-block"
                initial={{ width: 0 }}
                whileInView={{ width: 'auto' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span>{m.heading}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 rounded bg-dsa-red"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.div>
            </motion.h2>

            {m.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="mb-4 text-lg leading-relaxed max-w-70ch text-dsa-slate"
                style={{ fontSize: 'max(16px, 1rem)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href={m.button.href}
                className="transition-all duration-300 shadow-md btn btn-primary hover:shadow-lg hover-scale"
              >
                {m.button.text}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative h-96 md:h-[450px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Container for overlapping images */}
            <div className="relative w-full h-full">
              {/* First image - positioned at top-left */}
              <motion.div
                className="absolute top-0 left-0 w-[60%] h-[65%] z-10 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: -20, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 30,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/home-page-photos/1.jpg"
                  alt="DSA event"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>

              {/* Second image - overlapping in middle-right */}
              <motion.div
                className="absolute top-[15%] right-0 w-[50%] h-[60%] z-20 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 30,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/home-page-photos/2.jpg"
                  alt="DSA event"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>

              {/* Third image - at bottom-center, overlapping the other two */}
              <motion.div
                className="absolute bottom-0 left-[20%] w-[60%] h-[50%] z-30 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 40,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/home-page-photos/3.jpg"
                  alt="DSA event"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
