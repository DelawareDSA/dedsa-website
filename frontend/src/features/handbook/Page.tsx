// frontend/src/features/handbook/Page.tsx
import HandbookDocument from './components/HandbookDocument';

export interface HandbookPageContent {
  title: string;
  pdfUrl: string;
  fallbackContent: string;
  currentVersionLabel: string;
  lastUpdatedLabel: string;
  downloadButtonText: string;
  handbookDocument: {
    title: string;
    fallbackMessage: string;
    downloadLinkText: string;
  };
  keyMembershipSections: Array<{
    title: string;
    description: string;
    pageLink: string;
    linkText: string;
  }>;
  frequentlyAskedQuestions: Array<{
    question: string;
    answer: string;
  }>;
  membershipBenefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  nextSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
}

interface HandbookPageProps {
  data: HandbookPageContent;
}

export default function HandbookPage({ data }: HandbookPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="py-16 text-white bg-dsa-red">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{data.title}</h1>
          <p className="max-w-3xl mx-auto text-xl text-red-100">
            Your comprehensive guide to getting involved with Delaware DSA -
            from new member orientation to organizing campaigns and building
            democratic socialism.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Document Viewer */}
        <HandbookDocument data={data} />
      </div>
    </div>
  );
}
