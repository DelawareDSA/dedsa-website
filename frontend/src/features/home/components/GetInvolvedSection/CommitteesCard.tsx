import Link from 'next/link';
import committeesContent from '@/core/content/pages/home.json';
import { CommitteesCardContent } from '@/core/types/pages/home';
import CommitteeItem from './CommitteeItem';

const typedCommitteesContent =
  committeesContent.committeesCard as CommitteesCardContent;

export default function CommitteesCard() {
  const initialCount = typedCommitteesContent.initialDisplayCount || 4;

  const displayedCommittees = typedCommitteesContent.committees.slice(
    0,
    initialCount
  );

  return (
    <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-6">
        <svg
          className="w-8 h-8 text-dsa-red mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="text-2xl font-bold">{typedCommitteesContent.heading}</h3>
      </div>

      <div className="space-y-4">
        {displayedCommittees.map((committee, index) => (
          <CommitteeItem
            key={committee.title}
            committee={committee}
            index={index}
          />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={typedCommitteesContent.buttonHref}
          className="group inline-flex items-center btn btn-primary shadow-sm hover:shadow transition-all"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {typedCommitteesContent.buttonText}
        </Link>
      </div>
    </div>
  );
}
