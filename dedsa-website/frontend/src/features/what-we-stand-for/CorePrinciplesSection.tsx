import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { CorePrinciplesContent } from '@/core/types/pages/whatWeStandFor';

export default function CorePrinciplesSection({
  corePrinciplesSection,
}: {
  corePrinciplesSection: CorePrinciplesContent;
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
            {corePrinciplesSection.title}
          </h2>
          <p className="text-lg text-dsa-black max-w-3xl mx-auto">
            {corePrinciplesSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corePrinciplesSection.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="bg-white border-l-4 border-dsa-red p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-red-50 rounded-full mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-dsa-red"
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
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dsa-black mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-dsa-black leading-relaxed mb-3">
                    {principle.description}
                  </p>
                  <Link
                    href={principle.sourceLink}
                    className="text-sm text-dsa-red hover:underline inline-flex items-center"
                  >
                    Source: {principle.source}
                    <svg
                      className="ml-1 w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
