// frontend/src/features/bylaws/Page.tsx
import { contentService } from '@/core/services/contentService';
import type { BylawsPageContent as BylawsContent } from '@/core/types/pages/bylaws';
import BylawsDocument from './components/BylawsDocument';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import KeyGovernanceSections from './components/KeyGovernanceSections';
import OtherDocuments from './components/OtherDocuments';

export default function BylawsPage() {
  // grab the full JSON under "bylaws" key
  const data = contentService.getPageContent('bylaws') as BylawsContent;

  return (
    <div className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="space-y-12 container-page">
        {/* Main bylaws document display */}
        <BylawsDocument data={data} />

        {/* Key sections for navigation */}
        <KeyGovernanceSections data={data} />

        {/* FAQ section */}
        <FrequentlyAskedQuestions data={data} />

        {/* Related documents */}
        <OtherDocuments data={data} />
      </div>
    </div>
  );
}
