'use client';

import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface CalendarFeatureProps extends CalendarPageContent {
  eventCalendar: EventCalendarContent;

  monthSelectorData: MonthSelectorContent;

  subscription: CalendarSubscription;
}

export default function CalendarFeature({
  title,
  subtitle,
  errorTitle,
  errorMessage,
  errorActionLabel,
  subscribeTitle,
  subscribeText,
  googleCalendarButtonText,
  iCalOutlookButtonText,

  eventCalendar,
  monthSelectorData,
  subscription,
}: CalendarFeatureProps) {
  const [showEmbed, setShowEmbed] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [debugInfo, setDebugInfo] =
    useState<Partial<CalendarFeatureProps> | null>(null);
  const { googleCalendarEmbedUrl, iCalUrl, googleCalendarUrl } = subscription;

  useEffect(() => {
    console.log('CalendarFeature props:', {
      title,
      subtitle,
      eventCalendar,
      monthSelectorData,
      subscription,
    });
    setDebugInfo({
      title,
      subtitle,
      eventCalendar,
      monthSelectorData,
      subscription,
    });
  }, [title, subtitle, eventCalendar, monthSelectorData, subscription]);

  return (
    <div className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-4xl font-bold">
            {title || 'Events Calendar'}
          </h1>
          <p className="text-xl text-dsa-black">
            {subtitle ||
              'Join us for meetings, actions, educational events, and social gatherings.'}
          </p>
        </motion.div>

        {}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <div className="p-4 mb-6 border border-yellow-200 rounded-lg bg-yellow-50">
            <h3 className="mb-2 font-bold text-yellow-800">Debug Info:</h3>
            <pre className="overflow-auto text-xs text-yellow-700">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {}
          <div className="lg:col-span-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Delaware DSA Calendar</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmbed(!showEmbed)}
                    className={`px-4 py-2 rounded transition-colors ${
                      showEmbed
                        ? 'bg-dsa-red text-white'
                        : 'bg-gray-200 text-dsa-black hover:bg-gray-300'
                    }`}
                  >
                    {showEmbed ? 'Hide Calendar' : 'Show Calendar'}
                  </button>
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Open in Google Calendar
                  </a>
                </div>
              </div>

              {showEmbed ? (
                <div className="relative">
                  <iframe
                    src={googleCalendarEmbedUrl}
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                    className="w-full border-none rounded"
                    title="Delaware DSA Calendar"
                    onError={() => setShowEmbed(false)}
                  ></iframe>
                  {}
                  <div
                    id="calendar-fallback"
                    className="absolute inset-0 flex items-center justify-center p-8 text-center bg-white rounded bg-opacity-90"
                  >
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-dsa-black">
                        {errorTitle || 'Calendar Temporarily Unavailable'}
                      </h3>
                      <p className="mb-4 text-dsa-black">
                        {errorMessage ||
                          'The embedded calendar cannot be displayed. Please use the links below to view our calendar.'}
                      </p>
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 btn btn-primary"
                      >
                        {googleCalendarButtonText || 'Open in Google Calendar'}
                      </a>
                      <button
                        onClick={() => setShowEmbed(false)}
                        className="btn btn-secondary"
                      >
                        {errorActionLabel || 'View Event List'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="mb-4 text-xl font-bold">Upcoming Events</h3>
                  {eventCalendar.events.length > 0 ? (
                    eventCalendar.events.slice(0, 10).map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-white border-l-4 rounded-r-lg shadow-sm border-dsa-red"
                      >
                        <h4 className="mb-1 text-lg font-semibold">
                          {event.title}
                        </h4>
                        <p className="mb-2 text-sm text-dsa-black">
                          {new Date(event.startDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            }
                          )}
                        </p>
                        <p className="text-sm text-dsa-black">
                          {event.isVirtual ? '🔗 Virtual Event' : '📍'}{' '}
                          {event.location}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-dsa-black">
                      No upcoming events scheduled.
                    </p>
                  )}
                </div>
              )}

              {}
              <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-xl font-bold">Event Information</h3>
                <div className="py-8 text-center">
                  <p className="mb-2 text-dsa-black">
                    {eventCalendar?.noEventsMessage ||
                      'No upcoming events scheduled.'}
                  </p>
                  <p className="text-sm text-dsa-black">
                    {eventCalendar?.checkBackMessage ||
                      'Please check back later for updates.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="space-y-6">
            {}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">
                {monthSelectorData?.label || 'Browse by Month'}
              </h3>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select a month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">
                {subscribeTitle || 'Subscribe to Our Calendar'}
              </h3>
              <p className="mb-4 text-dsa-black">
                {subscribeText ||
                  'Stay up-to-date with all Delaware DSA events by subscribing to our calendar.'}
              </p>

              <div className="space-y-3">
                <a
                  href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(subscription?.googleCalendarEmbedUrl?.split('?cid=')[1] || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full btn btn-primary"
                >
                  {googleCalendarButtonText || 'Subscribe to Google Calendar'}
                </a>
                <a
                  href={`https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(iCalUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full btn btn-secondary"
                >
                  Add to Outlook
                </a>
                <a
                  href={iCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full btn btn-secondary"
                >
                  {iCalOutlookButtonText || 'iCal/Apple Calendar'}
                </a>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/join"
                  className="block text-dsa-red hover:underline"
                >
                  Join Delaware DSA →
                </Link>
                <Link
                  href="/committees"
                  className="block text-dsa-red hover:underline"
                >
                  View Committees →
                </Link>
                <Link
                  href="/contact"
                  className="block text-dsa-red hover:underline"
                >
                  Contact Us →
                </Link>
                <Link
                  href="/calendar/events"
                  className="block text-dsa-red hover:underline"
                >
                  View All Events →
                </Link>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">
                Meeting Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>General Meetings:</strong>
                  <p className="text-dsa-black">
                    Fourth Monday of each month, 7:00 PM
                  </p>
                </div>
                <div>
                  <strong>Location:</strong>
                  <p className="text-dsa-black">Usually virtual via Zoom</p>
                </div>
                <div>
                  <strong>Contact:</strong>
                  <p className="text-dsa-black">
                    <a
                      href="mailto:delaware.socialists@gmail.com"
                      className="text-dsa-red hover:underline"
                    >
                      delaware.socialists@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">Event Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">General Meetings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Actions & Protests</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Social Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Educational Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Committee Meetings</span>
                </div>
              </div>
            </div>

            {}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <p className="text-dsa-black">
                  Having trouble viewing the calendar or need event details?
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:delaware.socialists@gmail.com"
                    className="block text-dsa-red hover:underline"
                  >
                    Email us for support →
                  </a>
                  <Link
                    href="/contact"
                    className="block text-dsa-red hover:underline"
                  >
                    Contact form →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
