import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { StrategicGoalsContent } from '@/core/types/pages/whatWeStandFor';

export default function StrategicGoalsSection({
  strategicGoalsSection,
}: {
  strategicGoalsSection: StrategicGoalsContent;
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
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {strategicGoalsSection.title}
          </h2>
          <p className="text-lg text-dsa-black max-w-3xl mx-auto">
            {strategicGoalsSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategicGoalsSection.goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="p-4 bg-blue-50 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={goal.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dsa-black mb-4">
                  {goal.title}
                </h3>
                <p className="text-dsa-black leading-relaxed mb-4">
                  {goal.description}
                </p>
                <span className="text-sm text-dsa-black bg-dsa-red-t4 px-2 py-1 rounded">
                  Bylaws {goal.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/bylaws"
            className="inline-flex items-center text-dsa-red hover:underline font-medium text-lg"
          >
            Read our complete bylaws
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
