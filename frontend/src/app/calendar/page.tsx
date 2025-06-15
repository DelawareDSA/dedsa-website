'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'month'>('list');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const getEventDate = (event: CalendarEvent): Date => {
    const dateString = event.start.dateTime || event.start.date || '';
    return new Date(dateString);
  };

  const filterEventsByMonth = (events: CalendarEvent[], month: Date) => {
    return events.filter((event) => {
      const eventDate = getEventDate(event);
      return (
        eventDate.getMonth() === month.getMonth() &&
        eventDate.getFullYear() === month.getFullYear()
      );
    });
  };

  const groupEventsByDate = (events: CalendarEvent[]) => {
    const grouped: { [key: string]: CalendarEvent[] } = {};

    events.forEach((event) => {
      const date = getEventDate(event);
      const dateKey = date.toDateString();

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dsa-red-t4 py-12">
        <div className="container-page">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dsa-red mx-auto"></div>
            <p className="mt-4">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dsa-red-t4 py-12">
        <div className="container-page">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">
              Error Loading Events
            </h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentMonthEvents = filterEventsByMonth(events, selectedMonth);
  const groupedEvents = groupEventsByDate(currentMonthEvents);

  return (
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Delaware DSA Calendar</h1>
          <p className="text-xl text-dsa-black">
            Join us for meetings, actions, educational events, and social
            gatherings.
          </p>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded ${
                  view === 'list'
                    ? 'bg-dsa-red text-white'
                    : 'bg-gray-200 text-dsa-black hover:bg-gray-300'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded ${
                  view === 'month'
                    ? 'bg-dsa-red text-white'
                    : 'bg-gray-200 text-dsa-black hover:bg-gray-300'
                }`}
              >
                Month View
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const newDate = new Date(selectedMonth);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedMonth(newDate);
                }}
                className="p-2 hover:bg-dsa-red-t4 rounded"
              >
                ←
              </button>
              <span className="font-semibold">
                {selectedMonth.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                onClick={() => {
                  const newDate = new Date(selectedMonth);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedMonth(newDate);
                }}
                className="p-2 hover:bg-dsa-red-t4 rounded"
              >
                →
              </button>
            </div>

            <div className="flex gap-2">
              <a
                href="https://calendar.google.com/calendar/u/0/r?cid=ZjE3ZDRkNGQxNzU2Njc1YjMxYmYwYzdjYzE0NWM4ZTJiMGZkOTY3ZDkzYzU1ZTIzYzQwYTBmZTE1ZmU0ZmQ4ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm"
              >
                + Add to Google Calendar
              </a>
              <a
                href="https://calendar.google.com/calendar/ical/f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d%40group.calendar.google.com/public/basic.ics"
                className="btn btn-secondary text-sm"
              >
                Download .ics
              </a>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md p-6">
          {view === 'list' ? (
            <div className="space-y-6">
              {Object.keys(groupedEvents).length === 0 ? (
                <p className="text-dsa-black text-center py-8">
                  No events scheduled for{' '}
                  {selectedMonth.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              ) : (
                Object.entries(groupedEvents)
                  .sort(
                    ([dateA], [dateB]) =>
                      new Date(dateA).getTime() - new Date(dateB).getTime()
                  )
                  .map(([dateKey, dayEvents]) => (
                    <div
                      key={dateKey}
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <h3 className="text-lg font-bold text-dsa-black mb-3">
                        {new Date(dateKey).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h3>
                      <div className="space-y-3">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            <h4 className="font-semibold text-dsa-black">
                              {event.summary}
                            </h4>
                            {event.start.dateTime && (
                              <p className="text-sm text-dsa-black mt-1">
                                {new Date(
                                  event.start.dateTime
                                ).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true,
                                })}
                                {event.end?.dateTime &&
                                  ` - ${new Date(
                                    event.end.dateTime
                                  ).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                  })}`}
                              </p>
                            )}
                            {event.location && (
                              <p className="text-sm text-dsa-black mt-1">
                                📍 {event.location}
                              </p>
                            )}
                            {event.description && (
                              <p className="text-sm text-dsa-black mt-2">
                                {event.description.substring(0, 200)}...
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>
          ) : (
            <MonthView events={currentMonthEvents} month={selectedMonth} />
          )}
        </div>

        {}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-dsa-black mb-4">
            Subscribe to our calendar to automatically receive updates about
            Delaware DSA events.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/join" className="btn btn-primary">
              Join Delaware DSA
            </Link>
            <Link href="/committees" className="btn btn-secondary">
              Explore Committees
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthView({
  events,
  month,
}: {
  events: CalendarEvent[];
  month: Date;
}) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(month);
  const firstDay = getFirstDayOfMonth(month);
  const weeks = Math.ceil((daysInMonth + firstDay) / 7);

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(
        event.start.dateTime || event.start.date || ''
      );
      return eventDate.getDate() === day;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th
                key={day}
                className="text-center p-2 font-semibold text-dsa-black"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dayNumber = weekIndex * 7 + dayIndex - firstDay + 1;
                const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                const dayEvents = isValidDay ? getEventsForDay(dayNumber) : [];

                return (
                  <td
                    key={dayIndex}
                    className={`border border-gray-200 p-2 h-24 align-top ${
                      !isValidDay ? 'bg-gray-50' : ''
                    }`}
                  >
                    {isValidDay && (
                      <>
                        <div className="font-semibold text-sm mb-1">
                          {dayNumber}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs bg-dsa-red text-white px-1 py-0.5 rounded truncate"
                              title={event.summary}
                            >
                              {event.summary}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-dsa-black">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
