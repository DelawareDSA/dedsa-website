import { BylawsPageContent } from '@/core/types/pages/bylaws';

interface KeyGovernanceSectionsProps {
  data: BylawsPageContent;
}

export default function KeyGovernanceSections({
  data,
}: KeyGovernanceSectionsProps) {
  const sections = data.keyGovernanceSections || [];

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Key Governance Sections</h2>
      <p className="mb-6 text-gray-600">
        Our bylaws establish a democratic structure with clear roles,
        responsibilities, and procedures. Click the links below to jump to
        specific sections in the PDF document.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-6 transition-shadow border border-gray-200 rounded-lg hover:shadow-md"
          >
            <h3 className="mb-2 text-xl font-bold text-dsa-red">
              {section.title}
            </h3>
            <p className="mb-4 text-gray-700">{section.description}</p>

            {}
            <a
              href={`${data.pdfUrl}#${section.pageLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-dsa-red hover:underline"
            >
              {section.linkText}
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <div className="p-4 mt-8 rounded-lg bg-dsa-red-t4">
        <p className="text-sm text-gray-700">
          <strong>Navigation Tip:</strong> Links will open the PDF in a new tab
          and attempt to jump to the specified page. If page navigation doesn't
          work automatically, use your PDF viewer's page navigation controls.
        </p>
      </div>
    </div>
  );
}
