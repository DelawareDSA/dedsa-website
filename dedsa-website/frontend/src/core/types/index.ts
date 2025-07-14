export * from './pages';
export * from './layout';
export * from './api';
export * from './components';
export * from './hooks';

export interface BaseEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  isVirtual?: boolean;
}

export type EventCategory =
  | 'meeting'
  | 'action'
  | 'social'
  | 'education'
  | 'other';

export interface CalendarEvent extends BaseEvent {
  startDate: string;
  endDate?: string;
  category: EventCategory;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  location: string;
  isVirtual?: boolean;
}

export interface Newsletter {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: { sourceUrl: string; altText: string };
  };
  author?: { node: { name: string } };
  content?: string;
  fullContentPath?: string;
  htmlPath: string;
}
