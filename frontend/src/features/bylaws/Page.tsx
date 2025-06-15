import { contentService } from '@/core/services/contentService';
import type { BylawsPageContent as BylawsContent } from '@/core/types/pages/bylaws';
import BylawsDocument from './components/BylawsDocument';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import KeyGovernanceSections from './components/KeyGovernanceSections';
import OtherDocuments from './components/OtherDocuments';

export default function BylawsPage() {
  const data = contentService.getPageContent('bylaws') as BylawsContent;

  return (
    <div className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="space-y-12 container-page">
        {}
        <BylawsDocument data={data} />

        {}
        <KeyGovernanceSections data={data} />

        {}
        <FrequentlyAskedQuestions data={data} />

        {}
        <OtherDocuments data={data} />
      </div>
    </div>
  );
}
