import { HandbookPageContent } from '../Page';

interface NextStepsProps {
  data: HandbookPageContent;
}

export default function NextSteps({ data }: NextStepsProps) {
  const steps = data.nextSteps || [];

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Your Next Steps</h2>
      <p className="mb-8 text-gray-600">
        Ready to dive deeper into democratic socialist organizing? Here's a
        pathway to help you grow from new member to active organizer and leader.
      </p>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 bg-dsa-red text-white rounded-full font-bold text-lg">
                {step.step}
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-dsa-red-t4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Questions About Getting Involved?
        </h3>
        <p className="text-gray-700 mb-4">
          Our Membership Coordinator and chapter leaders are here to help you
          find your place in Delaware DSA. Don't hesitate to reach out with
          questions or to learn more about specific opportunities.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dsa-red hover:bg-red-700 transition-colors"
        >
          Contact Us
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
