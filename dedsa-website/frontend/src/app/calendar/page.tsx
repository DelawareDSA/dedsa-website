'use client';

import { CalendarEvent, useCalendarEvents } from '@/hooks/useCalendarEvents';
import Link from 'next/link';
import { useState } from 'react';
import { safeFilter } from '../../../utils/safeFilter';

export default function CalendarPage() {
  const [view, setView]               = useState<'list' | 'month'>('list');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { events, loading, error }    = useCalendarEvents(selectedMonth);

  const getEventDate = (e: CalendarEvent) =>
    new Date(e.start.dateTime || e.start.date || '');

  const filterEventsByMonth = (evts: CalendarEvent[], m: Date) =>
    safeFilter(evts, (e: CalendarEvent) => {
      const d = getEventDate(e);
      return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear();
    });

  const groupEventsByDate = (evts: CalendarEvent[]) => {
    return evts.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
      const key = getEventDate(e).toDateString();
      (acc[key] = acc[key] || []).push(e);
      return acc;
    }, {});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dsa-red-t4 py-12">
        <div className="container-page text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dsa-red mx-auto" />
          <p className="mt-4">Loading events...</p>
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
  const groupedEvents      = groupEventsByDate(currentMonthEvents);

  return (
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Delaware DSA Calendar</h1>
          <p className="text-xl text-dsa-black">
            Join us for meetings, actions, educational events, and social gatherings.
          </p>
        </div>

        {/* View & Month Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Toggle List/Month */}
            <div className="flex gap-2">
              {['list','month'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as any)}
                  className={`px-4 py-2 rounded ${
                    view === v
                      ? 'bg-dsa-red text-white'
                      : 'bg-gray-200 text-dsa-black hover:bg-gray-300'
                  }`}
                >
                  {v === 'list' ? 'List View' : 'Month View'}
                </button>
              ))}
            </div>

            {/* Month Nav */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const d = new Date(selectedMonth);
                  d.setMonth(d.getMonth() - 1);
                  setSelectedMonth(d);
                }}
                className="p-2 hover:bg-dsa-red-t4 rounded"
              >←</button>
              <span className="font-semibold">
                {selectedMonth.toLocaleDateString('en-US', {
                  month: 'long', year: 'numeric'
                })}
              </span>
              <button
                onClick={() => {
                  const d = new Date(selectedMonth);
                  d.setMonth(d.getMonth() + 1);
                  setSelectedMonth(d);
                }}
                className="p-2 hover:bg-dsa-red-t4 rounded"
              >→</button>
            </div>

            {/* External Links */}
            <div className="flex gap-2">
              <a
                href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(
                  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID!
                )}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary text-sm"
              >
                + Add to Google Calendar
              </a>
              <a
                href={`https://calendar.google.com/calendar/ical/${encodeURIComponent(
                  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID!
                )}/public/basic.ics`}
                className="btn btn-secondary text-sm"
              >
                Download .ics
              </a>
            </div>
          </div>
        </div>

        {/* Events Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {view === 'list' ? (
            <div className="space-y-6">
              {Object.keys(groupedEvents).length === 0 ? (
                <p className="text-dsa-black text-center py-8">
                  No events scheduled for{' '}
                  {selectedMonth.toLocaleDateString('en-US', {
                    month: 'long', year: 'numeric'
                  })}
                </p>
              ) : (
                Object.entries(groupedEvents)
                  .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                  .map(([dateKey, dayEvents]) => (
                    <div key={dateKey} className="border-b border-gray-200 pb-6 last:border-0">
                      <h3 className="text-lg font-bold text-dsa-black mb-3">
                        {new Date(dateKey).toLocaleDateString('en-US', {
                          weekday: 'long', month: 'long', day: 'numeric'
                        })}
                      </h3>
                      <div className="space-y-3">
                        {dayEvents.map((ev) => (
                          <div key={ev.id} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-dsa-black">{ev.summary}</h4>
                            {ev.start.dateTime && (
                              <p className="text-sm text-dsa-black mt-1">
                                {new Date(ev.start.dateTime).toLocaleTimeString('en-US', {
                                  hour: 'numeric', minute: '2-digit', hour12: true
                                })}
                              </p>
                            )}
                            {ev.start.date && (
                              <p className="text-sm text-dsa-black mt-1">
                                {new Date(ev.start.date).toLocaleDateString()}
                              </p>
                            )}
                            {ev.link && (
                              <a
                                href={ev.link}
                                target="_blank" rel="noopener noreferrer"
                                className="text-sm text-dsa-red hover:underline mt-1 block"
                              >
                                View Details
                              </a>
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

        {/* Stay Updated CTA */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-dsa-black mb-4">
            Subscribe to our calendar to automatically receive updates.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/join"      className="btn btn-primary">Join Delaware DSA</Link>
            <Link href="/committees" className="btn btn-secondary">Explore Committees</Link>
            <Link href="/contact"    className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Month grid view component */
function MonthView({
  events,
  month,
}: {
  events: CalendarEvent[];
  month: Date;
}) {
  const dayCount   = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
  const startIndex = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const weeks      = Math.ceil((dayCount + startIndex) / 7);

  const getEventsForDay = (day: number) =>
    safeFilter(events, (e: CalendarEvent) => getEventDate(e).getDate() === day);

  function getEventDate(ev: CalendarEvent) {
    return new Date(ev.start.dateTime || ev.start.date || '');
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
              <th key={d} className="text-center p-2 font-semibold text-dsa-black">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const dayNum    = weekIdx*7 + dayIdx - startIndex + 1;
                const valid     = dayNum>0 && dayNum<=dayCount;
                const dayEvents = valid ? getEventsForDay(dayNum) : [];

                return (
                  <td
                    key={dayIdx}
                    className={`border border-gray-200 p-2 h-24 align-top ${
                      !valid ? 'bg-gray-50' : ''
                    }`}
                  >
                    {valid && (
                      <>
                        <div className="font-semibold text-sm mb-1">{dayNum}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0,2).map((ev) => (
                            <div
                              key={ev.id}
                              className="text-xs bg-dsa-red text-white px-1 py-0.5 rounded truncate"
                              title={ev.summary}
                            >
                              {ev.summary}
                            </div>
                          ))}
                          {dayEvents.length>2 && (
                            <div className="text-xs text-dsa-black">
                              +{dayEvents.length-2} more
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
