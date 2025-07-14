
'use client';

import type { CalendarEvent } from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface EventCardProps {
  event: CalendarEvent;
  isCompact?: boolean;
}

const CATEGORY_COLORS = {
  meeting: 'bg-blue-100 text-blue-800 border-blue-200',
  action: 'bg-red-100 text-red-800 border-red-200',
  social: 'bg-green-100 text-green-800 border-green-200',
  education: 'bg-purple-100 text-purple-800 border-purple-200',
  other: 'bg-dsa-red-t4 text-dsa-black border-gray-200',
};

export default function EventCard({
  event,
  isCompact = false,
}: EventCardProps) {
  if (!event) {
    console.error('EventCard: event prop is undefined');
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: Event data is missing</p>
      </div>
    );
  }

  const safeEvent = {
    id: event.id || 'unknown',
    title: event.title || 'Untitled Event',
    description: event.description || '',
    startDate: event.startDate || new Date().toISOString(),
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    isVirtual: event.isVirtual || false,
    category: event.category || 'other',
    committee: event.committee,
    registrationRequired: event.registrationRequired || false,
    registrationLink: event.registrationLink,
    capacity: event.capacity,
    attendeeCount: event.attendeeCount,
    tags: event.tags || [],
    slug: event.slug || event.id || 'unknown',
  };

  const formatTime = (startTime?: string, endTime?: string) => {
    if (!startTime) return '';

    try {
      const start = new Date(`2000-01-01T${startTime}`);
      const startFormatted = start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      if (endTime) {
        const end = new Date(`2000-01-01T${endTime}`);
        const endFormatted = end.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return `${startFormatted} - ${endFormatted}`;
      }

      return startFormatted;
    } catch (error) {
      console.error('Error formatting time:', error);
      return startTime;
    }
  };

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return date;
    }
  };

  const categoryColor =
    CATEGORY_COLORS[safeEvent.category as keyof typeof CATEGORY_COLORS] ||
    CATEGORY_COLORS.other;

  if (isCompact) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-l-4 border-dsa-red bg-white p-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{safeEvent.title}</h3>
            <div className="flex items-center gap-4 text-sm text-dsa-black mb-2">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
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
                {formatDate(safeEvent.startDate)}
              </span>
              {safeEvent.startTime && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
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
                  {formatTime(safeEvent.startTime, safeEvent.endTime)}
                </span>
              )}
            </div>
            <p className="text-sm text-dsa-black line-clamp-2">
              {safeEvent.description}
            </p>
          </div>
          <span
            className={`px-2 py-1 text-xs rounded-full border ${categoryColor}`}
          >
            {safeEvent.category}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-dsa-black line-clamp-2">
            {safeEvent.title}
          </h3>
          <span
            className={`px-3 py-1 text-sm rounded-full border ${categoryColor}`}
          >
            {safeEvent.category}
          </span>
        </div>

        {safeEvent.description && (
          <p className="text-dsa-black mb-4 line-clamp-3">
            {safeEvent.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-dsa-black">
            <svg
              className="w-4 h-4 flex-shrink-0"
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
            <span>{formatDate(safeEvent.startDate)}</span>
            {safeEvent.startTime && (
              <span>
                • {formatTime(safeEvent.startTime, safeEvent.endTime)}
              </span>
            )}
          </div>

          {safeEvent.location && (
            <div className="flex items-center gap-2 text-sm text-dsa-black">
              {safeEvent.isVirtual ? (
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              )}
              <span>{safeEvent.location}</span>
              {safeEvent.isVirtual && (
                <span className="text-blue-600 font-medium">Virtual Event</span>
              )}
            </div>
          )}

          {safeEvent.committee && (
            <div className="flex items-center gap-2 text-sm text-dsa-black">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{safeEvent.committee}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {safeEvent.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-dsa-red-t4 text-dsa-black text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <Link
            href={`/calendar/events/${safeEvent.slug}`}
            className="text-dsa-red hover:text-red-700 font-medium text-sm"
          >
            View Details →
          </Link>

          <div className="flex gap-2">
            {safeEvent.registrationRequired && safeEvent.registrationLink && (
              <a
                href={safeEvent.registrationLink}
                className="btn btn-primary text-sm px-4 py-2"
              >
                Register
              </a>
            )}
            <button className="btn btn-secondary text-sm px-4 py-2">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
