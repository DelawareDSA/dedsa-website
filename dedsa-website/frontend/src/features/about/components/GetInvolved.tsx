import getInvolvedContent from '@/core/content/pages/about.json';
import { GetInvolvedContent } from '@/core/types/pages/about';
import Link from 'next/link';

const typedContent = getInvolvedContent.getInvolved as GetInvolvedContent;

export default function GetInvolved() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">{typedContent.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {typedContent.involvementOptions.map((option, index) => (
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
                d={option.icon}
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">{option.title}</h3>
            <p className="mb-4">{option.description}</p>
            <Link href={option.link} className="text-dsa-red hover:underline">
              {option.linkText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
