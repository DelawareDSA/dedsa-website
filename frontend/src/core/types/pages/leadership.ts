export interface LeadershipPageContent {
  title: string;
  introContent: string;
  fallbackContent: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  name: string;
  bio: string;
  email: string;
  imageUrl?: string;
  order: number;
}

export interface LeadershipPageData {
  page?: { content?: string | null };
  leadership?: {
    nodes: Array<{
      id: string;
      title: string;
      content: string;
      leadership: { role: string; email: string; order: number };
      featuredImage?: { node: { sourceUrl: string } };
    }>;
  };
}

export interface ChapterStructureContent {
  title: string;
  description: string;
  structureItems: Record<string, { title: string; description: string }>;
  meetingsInfo: string;
  bylawsLinkText: string;
  bylawsLinkHref: string;
}

export interface LeadershipCardContent {
  roleDefault: string;
  nameDefault: string;
  bioDefault: string;
  emailDefault: string;
}

export interface OfficerPosition {
  position: string;
  count: string;
  responsibilities: string;
  requirements: string;
}

export interface OfficerStructureContent {
  title: string;
  description: string;
  officers: OfficerPosition[];
  diversityRequirements: {
    genderRequirement: string;
    bipocRequirement: string;
    note: string;
  };
}

export interface GovernanceProcess {
  title: string;
  description: string;
}

export interface GovernanceProcessContent {
  title: string;
  description: string;
  processes: GovernanceProcess[];
}

export interface FullLeadershipPageContent extends LeadershipPageContent {
  chapterStructure: ChapterStructureContent;
  leadershipCard: LeadershipCardContent;
  officerStructure?: OfficerStructureContent;
  governanceProcess?: GovernanceProcessContent;
}
