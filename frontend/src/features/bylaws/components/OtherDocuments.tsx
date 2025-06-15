import { BylawsPageContent } from '@/core/types/pages/bylaws';

interface OtherDocumentsProps {
  data: BylawsPageContent;
}

export default function OtherDocuments({ data }: OtherDocumentsProps) {
  const documents = data.otherDocuments || [];

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Related Documents</h2>
      <p className="mb-6 text-gray-600">
        Additional documents and resources related to our chapter governance and
        national DSA policies.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.href}
            target={doc.href.startsWith('http') ? '_blank' : '_self'}
            rel={
              doc.href.startsWith('http') ? 'noopener noreferrer' : undefined
            }
            className="block p-6 transition-all border border-gray-200 rounded-lg hover:shadow-md hover:border-dsa-red group"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 transition-colors text-dsa-red group-hover:text-red-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={doc.icon}
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-dsa-red">
                  {doc.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{doc.description}</p>
                <div className="flex items-center mt-3 text-sm font-medium text-dsa-red">
                  {doc.href.startsWith('http')
                    ? 'View External Document'
                    : 'View Document'}
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
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="p-4 mt-8 border rounded-lg bg-gray-50">
        <h3 className="mb-2 font-semibold text-gray-900">
          Need the bylaws in another format?
        </h3>
        <p className="text-sm text-gray-700">
          Our bylaws are available as a PDF above. If you need the document in
          an accessible format or have trouble viewing the PDF, please{' '}
          <a
            href="/contact"
            className="font-medium text-dsa-red hover:underline"
          >
            contact our chapter
          </a>{' '}
          and we'll be happy to provide alternative formats.
        </p>
      </div>
    </div>
  );
}
