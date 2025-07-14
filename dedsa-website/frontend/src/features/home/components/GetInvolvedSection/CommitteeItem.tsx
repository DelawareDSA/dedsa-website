import { Committee } from '@/core/types/pages/home';

interface CommitteeItemProps {
  committee: Committee;
  index: number;
}

export default function CommitteeItem({
  committee,
  index,
}: CommitteeItemProps) {
  return (
    <div
      className="group p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h4 className="font-bold group-hover:text-dsa-red transition-colors flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-dsa-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={committee.icon}
          />
        </svg>
        {committee.title}
      </h4>
      <p className="text-sm mt-2 pl-7 group-hover:text-dsa-black transition-colors">
        {committee.description}
      </p>
    </div>
  );
}
