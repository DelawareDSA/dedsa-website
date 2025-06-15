import joinHeroData from '@/core/content/pages/join.json';
import { JoinHeroContent } from '@/features/join/types';

const typedContent = joinHeroData.joinHero as JoinHeroContent;

export default function JoinHero() {
  return (
    <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
      <h1 className="text-4xl font-bold mb-4">{typedContent.title}</h1>
      <p className="text-xl">{typedContent.subtitle}</p>
    </div>
  );
}
