export interface CalendarPageContent {
  title: string;
  subtitle: string;
  errorTitle: string;
  errorMessage: string;
  errorActionLabel: string;
  subscribeTitle: string;
  subscribeText: string;
  googleCalendarButtonText: string;
  iCalOutlookButtonText: string;
}

export interface EventCalendarContent {
  noEventsMessage: string;
  checkBackMessage: string;
  loadingMessage: string;
  errorLoadingMessage: string;

  events: CalendarEvent[];
  isLoading: boolean;
  error?: Error;
}
export interface MonthSelectorContent {
  label: string;
  previousMonth: string;
  nextMonth: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  isVirtual?: boolean;
  virtualLink?: string;
  category?: 'meeting' | 'action' | 'social' | 'education' | 'other';
  committee?: string;
  isAllDay?: boolean;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  tags?: string[];
  slug: string;
  registrationRequired?: boolean;
  registrationLink?: string;
  capacity?: number;
  attendeeCount?: number;
}

export interface CalendarViewType {
  type: 'month' | 'week' | 'day' | 'list';
  label: string;
}

export interface CalendarSubscription {
  calendarId: string;
  googleCalendarEmbedUrl: string;
  googleCalendarUrl: string;
  iCalUrl: string;
  subscriptionInstructions?: string;
}

export interface CalendarFilters {
  categories: string[];
  committees: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
}
