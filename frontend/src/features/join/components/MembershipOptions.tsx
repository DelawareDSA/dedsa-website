import membershipOptionsData from '@/core/content/pages/join.json';
import { MembershipOptionsContent } from '@/features/join/types';
import Link from 'next/link';

// Type assertion for imported JSON
const typedContent =
  membershipOptionsData.membershipOptions as MembershipOptionsContent;

export default function MembershipOptions() {
  const { dsaMembership, duesWaiver } = typedContent;

  return (
    <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2">
      {/* DSA Membership Card */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="p-6 text-white bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-white">
            {dsaMembership.title}
          </h2>
          <p className="text-lg">{dsaMembership.subtitle}</p>
        </div>
        <div className="p-6">
          <ul className="mb-6 space-y-4">
            {dsaMembership.benefits.map((benefit, index) => (
              <li key={index} className="flex">
                <svg
                  className="flex-shrink-0 w-6 h-6 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: benefit }} />
              </li>
            ))}
          </ul>
          <a
            href={dsaMembership.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center btn btn-primary"
          >
            {dsaMembership.buttonText}
          </a>
        </div>
      </div>

      {/* Dues Waiver Card */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="p-6 text-white bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-white">
            {duesWaiver.title}
          </h2>
          <p className="text-lg">{duesWaiver.subtitle}</p>
        </div>
        <div className="p-6">
          {duesWaiver.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
          <Link
            href={duesWaiver.buttonUrl}
            className="block w-full text-center btn btn-primary"
          >
            {duesWaiver.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
