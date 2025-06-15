'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  category: 'meeting' | 'action' | 'social' | 'education' | 'other';
  committee: string;
  registrationRequired: boolean;
  registrationLink?: string;
  capacity?: number;
  attendeeCount?: number;
  tags: string[];
}

interface CalendarEventClientProps {
  event: Event;
  eventDate: Date;
  isUpcoming: boolean;
  relatedEvents: Event[];
}

export default function CalendarEventClient({
  event,
  eventDate,
  isUpcoming,
  relatedEvents,
}: CalendarEventClientProps) {
  return (
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-dsa-black">
              <li>
                <Link href="/" className="hover:text-dsa-red">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/calendar" className="hover:text-dsa-red">
                  Calendar
                </Link>
              </li>
              <li>/</li>
              <li className="text-dsa-black">{event.title}</li>
            </ol>
          </nav>

          {}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.category === 'meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : event.category === 'action'
                            ? 'bg-red-100 text-red-800'
                            : event.category === 'social'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-dsa-red-t4 text-dsa-black'
                      }`}
                    >
                      {event.category.charAt(0).toUpperCase() +
                        event.category.slice(1)}
                    </span>
                    {isUpcoming && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-dsa-black mb-2">
                    {event.title}
                  </h1>
                  <p className="text-xl text-dsa-black">
                    {event.committee} Committee
                  </p>
                </div>
              </div>

              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-dsa-black mb-2">
                      Date & Time
                    </h3>
                    <div className="text-dsa-black">
                      <p className="font-medium">
                        {eventDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {event.startTime && (
                        <p>
                          {event.startTime}{' '}
                          {event.endTime && `- ${event.endTime}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-dsa-black mb-2">
                      Location
                    </h3>
                    <p className="text-dsa-black">{event.location}</p>
                    {event.isVirtual && event.virtualLink && (
                      <a
                        href={event.virtualLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-dsa-red hover:underline"
                      >
                        Join Virtual Event →
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {event.registrationRequired && (
                    <div>
                      <h3 className="text-lg font-semibold text-dsa-black mb-2">
                        Registration
                      </h3>
                      {event.registrationLink ? (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Register Now
                        </a>
                      ) : (
                        <p className="text-dsa-black">
                          Registration required - contact us for details
                        </p>
                      )}
                      {event.capacity && (
                        <p className="text-sm text-dsa-black mt-2">
                          {event.attendeeCount || 0} / {event.capacity}{' '}
                          registered
                        </p>
                      )}
                    </div>
                  )}

                  {event.tags && event.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-dsa-black mb-2">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-dsa-red-t4 text-dsa-black rounded text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-dsa-black mb-4">
                  About This Event
                </h3>
                <div className="prose max-w-none text-dsa-black">
                  <p>{event.description}</p>
                </div>
              </div>

              {}
              <div className="border-t pt-8 flex flex-wrap gap-4">
                <Link href="/calendar" className="btn btn-secondary">
                  ← Back to Calendar
                </Link>
                <a
                  href={`mailto:info@delawardsa.org?subject=Question about ${event.title}`}
                  className="btn btn-outline"
                >
                  Contact Organizers
                </a>
                {isUpcoming && !event.registrationRequired && (
                  <button className="btn btn-primary">
                    Add to My Calendar
                  </button>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-dsa-black mb-6">
              More Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  href={`/calendar/events/${relatedEvent.id}`}
                  className="block p-4 border rounded-lg hover:border-dsa-red transition-colors"
                >
                  <h4 className="font-semibold text-dsa-black mb-2">
                    {relatedEvent.title}
                  </h4>
                  <p className="text-sm text-dsa-black mb-2">
                    {new Date(relatedEvent.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-dsa-black">
                    {relatedEvent.description.slice(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
