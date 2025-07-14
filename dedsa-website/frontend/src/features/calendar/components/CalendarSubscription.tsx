'use client';

import { useState } from 'react';

interface CalendarSubscriptionProps {
  googleCalendarUrl: string;
  iCalUrl: string;
  embedUrl: string;
}

export default function CalendarSubscription({
  iCalUrl,
  embedUrl,
}: CalendarSubscriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string>('');
  const [showEmbed, setShowEmbed] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateGoogleCalendarAddUrl = () => {
    const calendarId =
      'f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com';
    return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(
      calendarId
    )}`;
  };

  const generateOutlookUrl = () => {
    const baseUrl = 'https://outlook.live.com/calendar/0/addcalendar';
    return `${baseUrl}?url=${encodeURIComponent(iCalUrl)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Subscribe to Our Calendar</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">
          {}
          Subscribe
        </button>
      </div>

      <p className="text-dsa-black mb-4">
        Stay up-to-date with all Delaware DSA events by subscribing to our
        calendar.
      </p>

      {isOpen && (
        <div className="space-y-4 border-t pt-4">
          {}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">{}</div>
            <a
              href={generateGoogleCalendarAddUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Subscribe
            </a>
          </div>

          {}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">{}</div>
            <a
              href={generateOutlookUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Add to Outlook
            </a>
          </div>

          {}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">{}</div>
            <a
              href={iCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Add to Apple
            </a>
          </div>

          {}
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-dsa-black mb-2">Copy the iCal URL:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={iCalUrl}
                readOnly
                className="flex-1 p-2 border rounded text-sm bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(iCalUrl, 'ical')}
                className={`px-3 py-2 text-sm rounded transition-colors ${
                  copied === 'ical'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-dsa-red-t4 hover:bg-gray-200'
                }`}
              >
                {copied === 'ical' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {}
          <div className="p-4 border rounded-lg">
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="text-sm text-dsa-red hover:underline"
            >
              {showEmbed ? 'Hide' : 'Show'} Calendar
            </button>
            {showEmbed && (
              <iframe
                src={embedUrl}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                className="rounded w-full"
                title="Delaware DSA Calendar"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
