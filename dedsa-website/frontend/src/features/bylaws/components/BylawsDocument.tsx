'use client';
import { BylawsPageContent } from '@/core/types/pages/bylaws';

interface BylawsDocumentProps {
  data: BylawsPageContent;
}

export default function BylawsDocument({ data }: BylawsDocumentProps) {
  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">{data.title}</h1>
        <p className="mb-4 text-gray-600">{data.lastUpdatedLabel}</p>
      </div>

      {}
      <div className="p-8 text-center border-2 rounded-lg border-dsa-red bg-gradient-to-br from-red-50 to-white">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-dsa-red"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="mb-2 text-2xl font-bold text-gray-900">
            Delaware DSA Bylaws
          </h3>
          <p className="mb-6 text-xl text-gray-600">
            Our complete chapter bylaws document containing all governance
            structures, procedures, and policies approved by our membership.
          </p>
        </div>

        {}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-colors rounded-lg shadow-lg bg-dsa-red hover:bg-red-700 hover:shadow-xl"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            View PDF
          </a>

          <a
            href={data.pdfUrl}
            download="Delaware-DSA-Bylaws.pdf"
            className="inline-flex items-center px-8 py-4 text-lg font-medium transition-colors bg-white border-2 rounded-lg shadow-lg border-dsa-red text-dsa-red hover:bg-dsa-red hover:text-white hover:shadow-xl"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download PDF
          </a>
        </div>

        <div className="mt-6 text-sm text-center text-gray-600">
          <p className="text-xl">PDF file • Last updated: May 25, 2025</p>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
        <div className="p-4 rounded-lg bg-gray-50">
          <h4 className="mb-2 font-semibold text-gray-900">
            Chapter Structure
          </h4>
          <p className="text-sm text-gray-600">
            Learn about our Steering Committee, officers, branches, and
            democratic governance
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50">
          <h4 className="mb-2 font-semibold text-gray-900">
            Meetings & Elections
          </h4>
          <p className="text-sm text-gray-600">
            Understand our democratic processes, voting procedures, and election
            cycles
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50">
          <h4 className="mb-2 font-semibold text-gray-900">Amendments</h4>
          <p className="text-sm text-gray-600">
            See how bylaws can be changed through democratic member
            participation
          </p>
        </div>
      </div>

      {}
      <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h5 className="mb-1 font-medium text-blue-900">Viewing Tips</h5>
            <p className="text-sm text-blue-800">
              Click &quot;View PDF&quot; to open the document in your
              browser&apos;s PDF viewer. Most browsers support searching,
              zooming, and navigation within the PDF. If you have trouble
              viewing, try downloading the file instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
