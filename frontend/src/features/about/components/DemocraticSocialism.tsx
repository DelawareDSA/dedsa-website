'use client';

import GenericCard from '@/core/components/shared/GenericCard';
import GenericSection from '@/core/components/shared/GenericSection';
import { useEffect, useState } from 'react';

interface Principle {
  title: string;
  description: string;
}

interface DemocraticSocialismContent {
  title: string;
  principles: Principle[];
}

export default function DemocraticSocialism() {
  const [content, setContent] = useState<DemocraticSocialismContent | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('@/core/content/pages/about.json');
        setContent(data.democraticSocialism as DemocraticSocialismContent);
      } catch (err) {
        console.error('Failed to load democratic socialism content:', err);
      }
    };

    loadData();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <GenericSection heading={content.title} background="white" className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.principles.map((principle, index) => (
          <GenericCard
            key={index}
            title={principle.title}
            hasShadow={true}
            isHoverable={true}
            hasBorder={true}
          >
            <p className="text-dsa-black">{principle.description}</p>
          </GenericCard>
        ))}
      </div>
    </GenericSection>
  );
}
