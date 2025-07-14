import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { OrganizationContent } from '@/core/types/pages/whatWeStandFor';

export default function OrganizationSection({
  organizationSection,
}: {
  organizationSection: OrganizationContent;
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
            {organizationSection.title}
          </h2>
          <p className="text-lg text-dsa-black max-w-3xl mx-auto">
            {organizationSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {organizationSection.organizationTypes.map((type, index) => (
            <motion.div
              key={type.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-6">
                <div className="p-3 bg-purple-50 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={type.icon}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dsa-black mb-2">
                    {type.title}
                  </h3>
                  <p className="text-dsa-black leading-relaxed mb-4">
                    {type.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-dsa-black mb-3">Examples:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {type.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-2 bg-gray-50 rounded text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-md text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-dsa-black mb-4">
            Ready to Get Involved?
          </h3>
          <p className="text-lg text-dsa-black mb-6 max-w-3xl mx-auto">
            {organizationSection.participationInfo}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/committees" className="btn btn-primary">
              View All Committees
            </Link>
            <Link href="/join" className="btn btn-secondary">
              Join Delaware DSA
            </Link>
            <Link href="/bylaws" className="btn btn-outline">
              Read Our Bylaws
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
