import { UpcomingEvent } from '@/core/types/pages/home';

interface EventItemProps {
  event: UpcomingEvent;
  index: number;
}

export default function EventItem({ event, index }: EventItemProps) {
  if (!event) {
    return (
      <div className="border-l-4 border-gray-300 pl-4 py-3 bg-gray-50 rounded-r-lg">
        <p className="text-dsa-black text-sm">Event data unavailable</p>
      </div>
    );
  }

  const safeEvent = {
    title: event.title || 'Untitled Event',
    date: event.date || 'Date TBD',
    location: event.location || 'Location TBD',
    isVirtual: event.isVirtual || false,
  };

  return (
    <div
      className="border-l-4 border-dsa-red pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-dsa-red-t4 transition-all duration-300 transform hover:-translate-x-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h4 className="font-bold">{safeEvent.title}</h4>
      <p className="text-sm text-dsa-black flex items-center">
        <svg
          className="w-4 h-4 mr-1 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {safeEvent.date}
      </p>
    </div>
  );
}
