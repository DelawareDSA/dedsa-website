export interface WhatWeStandForHero {
  heading: string;
  description: string;
}

export interface AboutSectionContent {
  title: string;
  content: string;
}

export interface Principle {
  title: string;
  description: string;
  icon: string;
}

export interface BeliefsContent {
  title: string;
  subtitle: string;
  principles: Principle[];
}

export interface PlatformPlank {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface PlatformContent {
  title: string;
  subtitle: string;
  planks: PlatformPlank[];
}

export interface Priority2025 {
  title: string;
  description: string;
  iconPath: string;
}

export interface Priorities2025Content {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  priorities: Priority2025[];
}

export interface WhatWeStandForCTA {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface WhatWeStandForPageContent {
  hero: WhatWeStandForHero;
  aboutSection: AboutSectionContent;
  beliefs: BeliefsContent;
  platform: PlatformContent;
  priorities2025: Priorities2025Content;
  cta: WhatWeStandForCTA;
  emptyPositionsMessage: string;
  notFoundMessage: string;
}

export interface PositionCardContent {
  ariaLabels: {
    position: string;
  };
}
export interface CorePrincipleItem {
  title: string;
  description: string;
  icon: string;
  source: string;
  sourceLink: string;
}

export interface CorePrinciplesContent {
  title: string;
  subtitle: string;
  principles: CorePrincipleItem[];
}

export interface StrategicGoal {
  title: string;
  description: string;
  icon: string;
  source: string;
}

export interface StrategicGoalsContent {
  title: string;
  subtitle: string;
  goals: StrategicGoal[];
}

export interface DemocraticStructureItem {
  title: string;
  description: string;
  icon: string;
  responsibilities: string[];
}

export interface DemocraticStructureContent {
  title: string;
  subtitle: string;
  structure: DemocraticStructureItem[];
}

export interface OrganizationType {
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface OrganizationContent {
  title: string;
  subtitle: string;
  organizationTypes: OrganizationType[];
  participationInfo: string;
}

export interface WhatWeStandForPageContent {
  hero: WhatWeStandForHero;
  aboutSection: AboutSectionContent;
  corePrinciplesSection: CorePrinciplesContent;
  strategicGoalsSection: StrategicGoalsContent;
  beliefs: BeliefsContent;
  platform: PlatformContent;
  democraticStructureSection: DemocraticStructureContent;
  priorities2025: Priorities2025Content;
  organizationSection: OrganizationContent;
  cta: WhatWeStandForCTA;
  emptyPositionsMessage: string;
  notFoundMessage: string;
}
