import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { safeFilter } from '../../../../../utils/safeFilter';
import CalendarEventClient from './client';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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

const events: Record<string, Event> = {
  'general-meeting-june': {
    id: 'general-meeting-june',
    title: 'June General Meeting',
    description:
      'Join us for our monthly general meeting where we discuss ongoing campaigns, plan future actions, and welcome new members.',
    date: '2024-06-24',
    startTime: '19:00',
    endTime: '21:00',
    location: 'Virtual via Zoom',
    isVirtual: true,
    virtualLink: 'https://zoom.us/j/123456789',
    category: 'meeting' as const,
    committee: 'General',
    registrationRequired: false,
    tags: ['monthly', 'organizing', 'membership'],
  },
  'housing-action-planning': {
    id: 'housing-action-planning',
    title: 'Housing Justice Action Planning',
    description:
      'Strategic planning session for our upcoming housing justice campaign. We will discuss tenant organizing strategies and plan community outreach.',
    date: '2024-06-15',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Community Center, Wilmington',
    isVirtual: false,
    virtualLink: undefined,
    category: 'action' as const,
    committee: 'Housing Justice',
    registrationRequired: true,
    registrationLink: 'https://forms.gle/example',
    capacity: 25,
    attendeeCount: 18,
    tags: ['housing', 'justice', 'organizing', 'tenant rights'],
  },
  'mutual-aid-distribution': {
    id: 'mutual-aid-distribution',
    title: 'Mutual Aid Food Distribution',
    description:
      'Weekly food distribution event. Volunteers needed to help pack and distribute food to community members in need.',
    date: '2024-06-08',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Newark Community Kitchen',
    isVirtual: false,
    virtualLink: undefined,
    category: 'social' as const,
    committee: 'Mutual Aid',
    registrationRequired: false,
    registrationLink: undefined,
    capacity: undefined,
    attendeeCount: undefined,
    tags: ['mutual aid', 'community', 'food justice'],
  },
};

async function getEvent(slug: string) {
  const event = events[slug as keyof typeof events];
  if (!event) {
    return null;
  }
  return event;
}

export default async function CalendarEventPage({ params }: PageProps) {
  const { slug } = await params;

  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const allEvents = Object.values(events);
  const relatedEvents = safeFilter(allEvents, (e: Event) => e.id !== event.id).slice(0, 2);

  return <CalendarEventClient event={event} relatedEvents={relatedEvents} />;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Delaware DSA',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: `${event.title} | Delaware DSA`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'article',
      publishedTime: event.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(events).map((slug) => ({
    slug,
  }));
}
