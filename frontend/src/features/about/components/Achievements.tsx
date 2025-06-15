'use client';

import GenericCard from '@/core/components/shared/GenericCard';
import GenericSection from '@/core/components/shared/GenericSection';
import { tw } from '@/core/utils/styles/tailwindClasses';
import { useEffect, useState } from 'react';

interface AchievementsContent {
  title: string;
  defaultAchievements: string[];
}

interface AchievementsProps {
  achievements?: string[];
}

export default function Achievements({
  achievements: propAchievements,
}: AchievementsProps) {
  const [content, setContent] = useState<AchievementsContent | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('@/core/content/pages/about.json');
        setContent(data.achievements as AchievementsContent);
        setAchievements(
          propAchievements || data.achievements.defaultAchievements
        );
      } catch (err) {
        console.error('Failed to load achievements content:', err);
      }
    };

    loadData();
  }, [propAchievements]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <GenericSection heading={content.title} background="white" className="mb-8">
      <GenericCard className="p-8">
        <ul className={tw('space-y-4')}>
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="h-6 w-6 text-dsa-red flex-shrink-0 mr-4 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-lg">{achievement}</span>
            </li>
          ))}
        </ul>
      </GenericCard>
    </GenericSection>
  );
}
