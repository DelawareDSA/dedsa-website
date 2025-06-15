'use client';

import { useState } from 'react';
import { HandbookPageContent } from '../Page';

interface FAQSectionProps {
  data: HandbookPageContent;
}

export default function FAQSection({ data }: FAQSectionProps) {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );
  const faqs = data.frequentlyAskedQuestions || [];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <p className="mb-6 text-gray-600">
        Common questions about membership, involvement, and getting started with
        Delaware DSA.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left transition-colors rounded-t-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-dsa-red"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openQuestionIndex === index ? 'rotate-180' : ''
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
              </div>
            </button>
            {openQuestionIndex === index && (
              <div className="px-6 py-4 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 mt-8 rounded-lg bg-gray-50">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">
          Have More Questions?
        </h3>
        <p className="mb-4 text-gray-700">
          Can't find the answer you're looking for? Our membership team is here
          to help you navigate your involvement with Delaware DSA. Reach out
          anytime with questions about committees, events, or organizing
          opportunities.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent rounded-md bg-dsa-red hover:bg-red-700"
          >
            Contact Membership Team
          </a>
          <a
            href="/join"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Join Delaware DSA
          </a>
        </div>
      </div>
    </div>
  );
}
