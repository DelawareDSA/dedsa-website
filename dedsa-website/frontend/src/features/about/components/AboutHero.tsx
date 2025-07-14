import GenericSection from '@/core/components/shared/GenericSection';
import { contentService } from '@/core/services/contentService';
import type { AboutPageContent } from '@/core/types/pages/about';

const aboutContent = contentService.getPageContent('about') as AboutPageContent;

export default function AboutHero({
  missionStatement = aboutContent.aboutHero.defaultMissionStatement,
}: {
  missionStatement?: string;
}) {
  const { title } = aboutContent.aboutHero;

  return (
    <GenericSection heading={title} background="primary" className="mb-8">
      <p className="text-xl leading-relaxed">{missionStatement}</p>
    </GenericSection>
  );
}
