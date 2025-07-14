'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type EventCategory = 'meeting' | 'action' | 'social' | 'education' | 'other';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  category: EventCategory;
  committee: string;
  registrationRequired: boolean;
  registrationLink?: string;
  capacity?: number;
  attendeeCount?: number;
  tags?: string[];
}

interface CalendarEventClientProps {
  event: Event;
  relatedEvents?: Event[];
}

const CATEGORY_STYLES: Record<
  EventCategory,
  { label: string; bg: string; text: string }
> = {
  meeting: { label: 'Meeting', bg: 'bg-blue-100', text: 'text-blue-800' },
  action: { label: 'Action', bg: 'bg-red-100', text: 'text-red-800' },
  social: { label: 'Social', bg: 'bg-green-100', text: 'text-green-800' },
  education: {
    label: 'Education',
    bg: 'bg-purple-100',
    text: 'text-purple-800',
  },
  other: { label: 'Other', bg: 'bg-dsa-red-t4', text: 'text-dsa-black' },
};

export default function CalendarEventClient({
  event,
  relatedEvents = [],
}: CalendarEventClientProps) {
  const eventDate = new Date(event.date);
  const now = new Date();
  const isUpcoming = eventDate > now;

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeRange = event.startTime
    ? event.startTime + (event.endTime ? ` – ${event.endTime}` : '')
    : null;

  const mailtoLink = `mailto:delaware.socialists@gmail.com?subject=${encodeURIComponent(
    `Question about ${event.title}`
  )}`;

  const categoryStyle = CATEGORY_STYLES[event.category];

  return (
    <article className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {}
          <nav aria-label="breadcrumb" className="mb-6 text-sm text-dsa-black">
            <ol className="flex items-center space-x-2">
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
              <li aria-current="page" className="font-medium">
                {event.title}
              </li>
            </ol>
          </nav>

          {}
          <header className="p-8 overflow-hidden bg-white rounded-lg shadow-md">
            <div className="flex flex-col justify-between mb-6 md:flex-row">
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text}`}
                >
                  {categoryStyle.label}
                </span>
                {isUpcoming && (
                  <span className="px-3 py-1 ml-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    Upcoming
                  </span>
                )}
                <h1 className="mt-4 text-4xl font-bold text-dsa-black">
                  {event.title}
                </h1>
                <p className="mt-1 text-xl text-dsa-black">
                  {event.committee} Committee
                </p>
              </div>
            </div>

            {}
            <section className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
              {}
              <div>
                <h2 className="mb-2 text-lg font-semibold text-dsa-black">
                  Date &amp; Time
                </h2>
                <p className="font-medium text-dsa-black">
                  <time dateTime={event.date}>{formattedDate}</time>
                </p>
                {timeRange && <p className="text-dsa-black">{timeRange}</p>}
              </div>

              {}
              <div>
                <h2 className="mb-2 text-lg font-semibold text-dsa-black">
                  Location
                </h2>
                <p className="text-dsa-black">{event.location}</p>
                {event.isVirtual && event.virtualLink && (
                  <p className="mt-2">
                    <a
                      href={event.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dsa-red hover:underline"
                    >
                      Join Virtual Event →
                    </a>
                  </p>
                )}
              </div>
            </section>

            {}
            {event.registrationRequired && (
              <section className="mb-8">
                <h2 className="mb-2 text-lg font-semibold text-dsa-black">
                  Registration
                </h2>
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
                    Registration required – contact us for details
                  </p>
                )}
                {event.capacity != null && (
                  <p className="mt-2 text-sm text-dsa-black">
                    {event.attendeeCount ?? 0} / {event.capacity} registered
                  </p>
                )}
              </section>
            )}

            {}
            {event.tags && event.tags.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-2 text-lg font-semibold text-dsa-black">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm rounded bg-dsa-red-t4 text-dsa-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {}
            <section className="pt-8 mb-8 border-t">
              <h2 className="mb-4 text-lg font-semibold text-dsa-black">
                About This Event
              </h2>
              <div className="prose max-w-none text-dsa-black">
                <p>{event.description}</p>
              </div>
            </section>

            {}
            <div className="flex flex-wrap gap-4 pt-8 border-t">
              <Link href="/calendar" className="btn btn-secondary">
                ← Back to Calendar
              </Link>
              <a href={mailtoLink} className="btn btn-outline">
                Contact Organizers
              </a>
              {isUpcoming && !event.registrationRequired && (
                <button className="btn btn-primary">Add to My Calendar</button>
              )}
            </div>
          </header>

          {}
          {relatedEvents.length > 0 && (
            <aside className="p-8 mt-12 bg-white rounded-lg shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-dsa-black">
                More Events
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {relatedEvents.map(({ id, title, description, date }) => (
                  <Link
                    key={id}
                    href={`/calendar/events/${id}`}
                    className="block p-4 transition-colors border rounded-lg hover:border-dsa-red"
                  >
                    <h3 className="mb-2 font-semibold text-dsa-black">
                      {title}
                    </h3>
                    <p className="mb-2 text-sm text-dsa-black">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString()}
                      </time>
                    </p>
                    <p className="text-sm text-dsa-black">
                      {description.slice(0, 100)}…
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </motion.div>
      </div>
    </article>
  );
}
