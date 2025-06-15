'use client';
import { BylawsPageContent } from '@/core/types/pages/bylaws';
import { useState } from 'react';

interface FrequentlyAskedQuestionsProps {
  data: BylawsPageContent;
}

export default function FrequentlyAskedQuestions({
  data,
}: FrequentlyAskedQuestionsProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const questions = data.frequentlyAskedQuestions || [];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors rounded-lg hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="leading-relaxed text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 mt-8 rounded-lg bg-dsa-red-t4">
        <p className="text-sm text-gray-700">
          <strong>Have more questions?</strong> Contact our chapter leadership
          or attend one of our general meetings. You can also{' '}
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-dsa-red hover:underline"
          >
            view the full bylaws PDF
          </a>{' '}
          for complete details.
        </p>
      </div>
    </div>
  );
}
