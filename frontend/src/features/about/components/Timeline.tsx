import timelineData from '@/core/content/pages/about.json';
import { TimelineContent } from '@/core/types/pages/about';

const typedContent = timelineData.timeline as TimelineContent;

interface TimelineProps {
  foundingYear?: number;
  yearsActive?: number;
}

export default function Timeline({
  foundingYear = typedContent.defaultFoundingYear,
  yearsActive = new Date().getFullYear() - typedContent.defaultFoundingYear,
}: TimelineProps) {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6">Our History</h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="text-center md:text-left">
          <p className="text-4xl font-bold text-dsa-red">{foundingYear}</p>
          <p className="text-lg text-dsa-black">{typedContent.foundedLabel}</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-4xl font-bold text-dsa-red">{yearsActive}</p>
          <p className="text-lg text-dsa-black">
            {typedContent.yearsActiveLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
