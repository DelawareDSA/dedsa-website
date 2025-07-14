import { contentService } from '@/core/services/contentService';
import type {
  ChapterStructureContent,
  LeadershipCardContent,
  LeadershipPageContent,
} from '@/core/types/pages/leadership';
import LeadershipFeature from '@/features/leadership';

export default function LeadershipPage() {
  const data = contentService.getPageContent(
    'leadership'
  ) as LeadershipPageContent & {
    chapterStructure: ChapterStructureContent;
    leadershipCard: LeadershipCardContent;
  };
  return <LeadershipFeature {...data} />;
}
