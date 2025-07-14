'use client';

import Link from 'next/link';
import EventItem from './EventItem';
import { Event } from './types';

interface Props {
  events: Event[];
  maxEvents?: number;
}

export default function UpcomingEventsCard({ events, maxEvents = 3 }: Props) {
  console.log('UpcomingEventsCard got events:', events);
  const displayedEvents = events.slice(0, maxEvents);

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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-2xl font-bold">Upcoming Events</h3>
      </div>

      <div className="space-y-4">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event, index) => (
            <EventItem
              key={`${event.title}-${index}`}
              event={event}
              index={index}
            />
          ))
        ) : (
          <div className="text-center py-4 text-dsa-black">
            <p>No upcoming events scheduled.</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link
          href="/calendar"
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
          View All Events
        </Link>
      </div>
    </div>
  );
}
