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

  const mailtoLink = `mailto:info@delawardsa.org?subject=${encodeURIComponent(
    `Question about ${event.title}`
  )}`;

  const categoryStyle = CATEGORY_STYLES[event.category];

  return (
    <article className="min-h-screen bg-dsa-red-t4 py-12">
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
          <header className="bg-white rounded-lg shadow-md overflow-hidden p-8">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text}`}
                >
                  {categoryStyle.label}
                </span>
                {isUpcoming && (
                  <span className="ml-2 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
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
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {}
              <div>
                <h2 className="text-lg font-semibold text-dsa-black mb-2">
                  Date &amp; Time
                </h2>
                <p className="text-dsa-black font-medium">
                  <time dateTime={event.date}>{formattedDate}</time>
                </p>
                {timeRange && <p className="text-dsa-black">{timeRange}</p>}
              </div>

              {}
              <div>
                <h2 className="text-lg font-semibold text-dsa-black mb-2">
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
                <h2 className="text-lg font-semibold text-dsa-black mb-2">
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
                  <p className="text-sm text-dsa-black mt-2">
                    {event.attendeeCount ?? 0} / {event.capacity} registered
                  </p>
                )}
              </section>
            )}

            {}
            {event.tags && event.tags.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-dsa-black mb-2">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-dsa-red-t4 text-dsa-black rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {}
            <section className="border-t pt-8 mb-8">
              <h2 className="text-lg font-semibold text-dsa-black mb-4">
                About This Event
              </h2>
              <div className="prose max-w-none text-dsa-black">
                <p>{event.description}</p>
              </div>
            </section>

            {}
            <div className="border-t pt-8 flex flex-wrap gap-4">
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
            <aside className="mt-12 bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-dsa-black mb-6">
                More Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedEvents.map(({ id, title, description, date }) => (
                  <Link
                    key={id}
                    href={`/calendar/events/${id}`}
                    className="block p-4 border rounded-lg hover:border-dsa-red transition-colors"
                  >
                    <h3 className="font-semibold text-dsa-black mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-dsa-black mb-2">
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
