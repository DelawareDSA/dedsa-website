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
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            {title || 'Events Calendar'}
          </h1>
          <p className="text-xl text-dsa-black">
            {subtitle ||
              'Join us for meetings, actions, educational events, and social gatherings.'}
          </p>
        </motion.div>

        {}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
            <pre className="text-xs text-yellow-700 overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
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
                    className="rounded w-full border-none"
                    title="Delaware DSA Calendar"
                    onError={() => setShowEmbed(false)}
                  ></iframe>
                  {}
                  <div
                    id="calendar-fallback"
                    className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 text-center p-8 rounded"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-dsa-black mb-2">
                        {errorTitle || 'Calendar Temporarily Unavailable'}
                      </h3>
                      <p className="text-dsa-black mb-4">
                        {errorMessage ||
                          'The embedded calendar cannot be displayed. Please use the links below to view our calendar.'}
                      </p>
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary mr-2"
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
                  <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
                  {eventCalendar.events.length > 0 ? (
                    eventCalendar.events.slice(0, 10).map((event) => (
                      <div
                        key={event.id}
                        className="border-l-4 border-dsa-red bg-white p-4 rounded-r-lg shadow-sm"
                      >
                        <h4 className="font-semibold text-lg mb-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-dsa-black mb-2">
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
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Event Information</h3>
                <div className="text-center py-8">
                  <p className="text-dsa-black mb-2">
                    {eventCalendar?.noEventsMessage ||
                      'No upcoming events scheduled.'}
                  </p>
                  <p className="text-dsa-black text-sm">
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                {subscribeTitle || 'Subscribe to Our Calendar'}
              </h3>
              <p className="text-dsa-black mb-4">
                {subscribeText ||
                  'Stay up-to-date with all Delaware DSA events by subscribing to our calendar.'}
              </p>

              <div className="space-y-3">
                <a
                  href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(subscription?.googleCalendarEmbedUrl?.split('?cid=')[1] || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  {googleCalendarButtonText || 'Subscribe to Google Calendar'}
                </a>
                <a
                  href={`https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(iCalUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center"
                >
                  Add to Outlook
                </a>
                <a
                  href={iCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center"
                >
                  {iCalOutlookButtonText || 'iCal/Apple Calendar'}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
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
                      href="mailto:info@delawardsa.org"
                      className="text-dsa-red hover:underline"
                    >
                      info@delawardsa.org
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Event Categories</h3>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <p className="text-dsa-black">
                  Having trouble viewing the calendar or need event details?
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:info@delawardsa.org"
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
