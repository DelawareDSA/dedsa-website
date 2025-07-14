import aboutContent from '@/core/content/pages/about.json';
import AboutPage from '@/features/about/Page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the Delaware chapter of the Democratic Socialists of America.',
};

export default function Page() {
  const missionStatement = aboutContent.aboutHero.defaultMissionStatement;
  const foundingYear = aboutContent.timeline.defaultFoundingYear;

  const yearsActive = new Date().getFullYear() - foundingYear;
  const achievementsList = aboutContent.achievements.defaultAchievements;

  return (
    <AboutPage
      missionStatement={missionStatement}
      foundingYear={foundingYear}
      yearsActive={yearsActive}
      achievements={achievementsList}
    />
  );
}
