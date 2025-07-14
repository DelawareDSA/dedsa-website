'use client';

import type {
  PositionCardContent,
  WhatWeStandForPageContent,
} from '@/core/types/pages/whatWeStandFor';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import CorePrinciplesSection from './CorePrinciplesSection';
import OrganizationSection from './OrganizationSection';
import StrategicGoalsSection from './StrategicGoalsSection';

type Props = WhatWeStandForPageContent & { positionCard: PositionCardContent };

export default function WhatWeStandForPage(props: Props) {
  const {
    hero,
    aboutSection,
    corePrinciplesSection,
    strategicGoalsSection,
    beliefs,

    priorities2025,
    organizationSection,
    cta,
  } = props;

  return (
    <div className="min-h-screen bg-dsa-red-t4">
      {}
      <HeroSection hero={hero} />

      {}
      <AboutSection aboutSection={aboutSection} />

      {}
      <CorePrinciplesSection corePrinciplesSection={corePrinciplesSection} />

      {}
      <StrategicGoalsSection strategicGoalsSection={strategicGoalsSection} />

      {}
      <BeliefsSection beliefs={beliefs} />

      {}
      <PrioritiesSection priorities2025={priorities2025} />

      {}
      <OrganizationSection organizationSection={organizationSection} />

      {}
      <CTASection cta={cta} />
    </div>
  );
}

function HeroSection({ hero }: { hero: WhatWeStandForPageContent['hero'] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="bg-gradient-animated text-white py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="container-page relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.heading}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl max-w-4xl leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {hero.description}
        </motion.p>
      </div>
    </motion.section>
  );
}

function AboutSection({
  aboutSection,
}: {
  aboutSection: WhatWeStandForPageContent['aboutSection'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {aboutSection.title}
        </motion.h2>
        <motion.p
          className="text-lg text-center max-w-4xl mx-auto leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {aboutSection.content}
        </motion.p>
      </div>
    </motion.section>
  );
}

function BeliefsSection({
  beliefs,
}: {
  beliefs: WhatWeStandForPageContent['beliefs'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {beliefs.title}
          </h2>
          <p className="text-lg text-dsa-black max-w-3xl mx-auto">
            {beliefs.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beliefs.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-dsa-red rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={principle.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{principle.title}</h3>
              </div>
              <p className="text-dsa-black leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function PrioritiesSection({
  priorities2025,
}: {
  priorities2025: WhatWeStandForPageContent['priorities2025'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
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

      <div className="container-page relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-heading">
            {priorities2025.title}
          </h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded"></div>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {priorities2025.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {priorities2025.priorities.map((priority, index) => (
            <motion.div
              key={priority.title}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 border-l-4 border-dsa-red relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                style={{
                  background:
                    'radial-gradient(circle,rgba(236,31,39,0.1) 0%,rgba(255,255,255,0) 70%)',
                }}
              />

              <div className="flex items-start mb-4 relative z-10">
                <motion.div
                  className="p-3 bg-red-50 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6 text-dsa-red group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={priority.iconPath}
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-card-title group-hover:text-dsa-red transition-colors duration-300">
                  {priority.title}
                </h3>
              </div>

              <p className="pl-12 relative z-10 text-card-body transition-all duration-300">
                {priority.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={priorities2025.linkHref}
            className="inline-flex items-center text-link hover:underline font-medium group"
          >
            <span>{priorities2025.linkText}</span>
            <motion.svg
              className="ml-2 w-5 h-5"
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
    </motion.section>
  );
}

function CTASection({ cta }: { cta: WhatWeStandForPageContent['cta'] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-dsa-red text-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {cta.heading}
        </motion.h2>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {cta.description}
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href={cta.buttonHref}
            className="btn bg-white text-dsa-red hover:bg-dsa-red-t4 text-lg px-8 py-3"
          >
            {cta.buttonText}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
