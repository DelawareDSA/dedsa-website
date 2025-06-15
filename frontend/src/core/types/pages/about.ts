export interface AboutPageContent {
  page: {
    title: string;
    fallbackContent: string;
  };
  aboutHero: AboutHeroContent;
  achievements: AchievementsContent;
  democraticSocialism: DemocraticSocialismContent;
  getInvolved: GetInvolvedContent;
  nationalInfo: NationalInfoContent;
  timeline: TimelineContent;
}

export interface AboutHeroContent {
  title: string;
  defaultMissionStatement: string;
}

export interface AchievementsContent {
  title: string;
  defaultAchievements: string[];
}

export interface DemocraticSocialismContent {
  title: string;
  principles: Array<{
    title: string;
    description: string;
  }>;
}

export interface GetInvolvedContent {
  title: string;
  involvementOptions: Array<{
    title: string;
    icon: string;
    description: string;
    link: string;
    linkText: string;
  }>;
}

export interface NationalInfoContent {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface TimelineContent {
  defaultFoundingYear: number;
  foundedLabel: string;
  yearsActiveLabel: string;
}
