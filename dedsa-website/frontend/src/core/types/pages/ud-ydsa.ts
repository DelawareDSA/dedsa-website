export interface HeroSectionContent {
  title: string;
  subtitle: string;
}

export interface MeetingInfoSectionContent {
  getInvolvedTitle: string;
  meetingInfoTitle: string;
  meetingWhenLabel: string;
  meetingWhereLabel: string;
  meetingEmailLabel: string;
  followTitle: string;
  socialLinks: {
    instagram: { name: string; href: string };
    twitter: { name: string; href: string };
    facebook: { name: string; href: string };
  };
}

export interface JoinSectionContent {
  title: string;
  description: string;
  buttonText: string;
}

export interface CampaignsSectionContent {
  title: string;
  campaigns: Array<{
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
  }>;
}

export interface EventsSectionContent {
  title: string;
  viewAllLinkText: string;
  viewAllLinkHref: string;
  detailsButtonText: string;
  upcomingEvents: Array<{
    date: string;
    time: string;
    title: string;
    location: string;
    href: string;
  }>;
}

export interface LeadershipSectionContent {
  title: string;
  contactLinkText: string;
  contactLinkHref: string;
  leaders: Array<{
    name: string;
    role: string;
    imageInitials: string;
  }>;
}

export interface UdYdsaPageContent {
  hero: HeroSectionContent;
  campaignsSection: CampaignsSectionContent;
  eventsSection: EventsSectionContent;
  joinSection: JoinSectionContent;
  leadershipSection: LeadershipSectionContent;
  meetingInfoSection: MeetingInfoSectionContent;
}
