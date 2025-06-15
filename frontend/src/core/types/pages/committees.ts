// src/core/types/pages/committees.ts

export interface CommitteeOrGroup {
  title: string;
  purpose: string;
  privileges: string[];
}

export interface CommitteesPageContent {
  title: string;
  subtitle: string;
  description: string;
  committees: CommitteeOrGroup[];
  workingGroups: CommitteeOrGroup[];
}
