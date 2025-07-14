import type { CalendarEvent, UpcomingEvent } from '@/core/types';

interface EventDisplayProps {
  event: CalendarEvent | UpcomingEvent;
  variant?: 'compact' | 'full' | 'card';
  showVirtualBadge?: boolean;
}

export function EventDisplay({
  event,
  variant = 'compact',
  showVirtualBadge = true,
}: EventDisplayProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDate = () => {
    if ('startDate' in event) {
      return event.startDate;
    }
    return event.date;
  };

  if (variant === 'compact') {
    return (
      <div className="border-l-4 border-dsa-red pl-4 py-3">
        <h4 className="font-bold">{event.title}</h4>
        <p className="text-sm text-dsa-black">{formatDate(getDate())}</p>
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <h4 className="font-bold mb-2">{event.title}</h4>
      <p className="text-sm text-dsa-black mb-2">{formatDate(getDate())}</p>
      {showVirtualBadge && 'isVirtual' in event && event.isVirtual && (
        <span className="text-xs text-blue-600">Virtual Event</span>
      )}
    </div>
  );
}
