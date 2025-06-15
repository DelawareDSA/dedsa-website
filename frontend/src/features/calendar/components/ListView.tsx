'use client';

import type { CalendarEvent } from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

interface ListViewProps {
  events: CalendarEvent[];
}

export default function ListView({ events }: ListViewProps) {
  const groupedEvents = events.reduce(
    (groups, event) => {
      const date = new Date(event.startDate).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    },
    {} as Record<string, CalendarEvent[]>
  );

  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-dsa-black mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-dsa-black mb-2">
          No Events Found
        </h3>
        <p className="text-dsa-black">
          There are no events matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDates.map((dateString, index) => {
        const date = new Date(dateString);
        const dayEvents = groupedEvents[dateString];
        const isToday = date.toDateString() === new Date().toDateString();
        const isPast = date < new Date() && !isToday;

        return (
          <motion.div
            key={dateString}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-4"
          >
            <div
              className={`flex items-center gap-4 ${isPast ? 'opacity-75' : ''}`}
            >
              <div
                className={`text-2xl font-bold ${
                  isToday
                    ? 'text-dsa-red'
                    : isPast
                      ? 'text-dsa-black'
                      : 'text-dsa-black'
                }`}
              >
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {isToday && (
                <span className="px-2 py-1 bg-dsa-red text-white text-sm rounded-full">
                  Today
                </span>
              )}
              {isPast && (
                <span className="px-2 py-1 bg-gray-200 text-dsa-black text-sm rounded-full">
                  Past Event
                </span>
              )}
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-4">
              {dayEvents.map((event) => (
                <EventCard key={event.id} event={event} isCompact />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
