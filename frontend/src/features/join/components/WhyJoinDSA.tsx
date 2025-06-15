import whyJoinDsaContent from '@/core/content/pages/join.json';
import { WhyJoinDsaContent } from '@/features/join/types';

const typedContent = whyJoinDsaContent.whyJoinDSA as WhyJoinDsaContent;

export default function WhyJoinDSA() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold mb-6">{typedContent.heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {typedContent.items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <svg
              className="h-12 w-12 text-dsa-red mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={item.icon}
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
