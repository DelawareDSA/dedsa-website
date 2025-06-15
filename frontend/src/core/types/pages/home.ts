export interface HomePageContent {
  heroSection: HeroSectionContent;
  missionSection: MissionSectionContent;
  strategicPrioritiesSection: StrategicPrioritiesSectionContent;
  getInvolvedSection: GetInvolvedSectionContent;
  upcomingEventsCard: UpcomingEventsCardContent;
  committeesCard: CommitteesCardContent;
  chapterStatsSection: ChapterStatsSectionContent;
  joinCTASection: JoinCTASectionContent;
}
export interface HeroSectionContent {
  mainHeading: string;
  subHeading: string;
  tagline: string;
  description: string;
  buttons: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

export interface MissionSectionContent {
  heading: string;
  paragraphs: string[];
  button: { text: string; href: string };
}

export interface StrategicPrioritiesSectionContent {
  heading: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  priorities: Array<{
    title: string;
    description: string;
    iconPath: string;
  }>;
}

export interface GetInvolvedSectionContent {
  heading: string;
  subheading: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  location: string;
  isVirtual?: boolean;
}

export interface UpcomingEventsCardContent {
  heading: string;
  buttonText: string;
  buttonHref: string;
  events: UpcomingEvent[];
}

export interface Committee {
  title: string;
  description: string;
  icon: string;
}

export interface CommitteesCardContent {
  heading: string;
  buttonText: string;
  buttonHref: string;
  committees: Committee[];
  initialDisplayCount?: number;
}

export interface StatItem {
  key: string;
  value: number;
  label: string;
  prefix: string;
  color: string;
}

export interface ChapterStatsSectionContent {
  heading: string;
  stats: StatItem[];
}

export interface JoinCTASectionContent {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}
