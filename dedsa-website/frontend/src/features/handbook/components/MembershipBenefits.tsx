import { HandbookPageContent } from '../Page';

interface MembershipBenefitsProps {
  data: HandbookPageContent;
}

export default function MembershipBenefits({ data }: MembershipBenefitsProps) {
  const benefits = data.membershipBenefits || [];

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Membership Benefits</h2>
      <p className="mb-8 text-gray-600">
        Delaware DSA membership connects you to a vibrant community of
        democratic socialists working for transformative change. Here&apos;s
        what membership offers:
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-dsa-red-t4">
                <svg
                  className="w-6 h-6 text-dsa-red"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d={benefit.icon}
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 mt-8 rounded-lg bg-gray-50">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">
          Ready to Get More Involved?
        </h3>
        <p className="mb-4 text-gray-700">
          Your membership dues support our organizing work and help build the
          democratic socialist movement in Delaware. The more active you are,
          the stronger our chapter becomes.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/committees"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent rounded-md bg-dsa-red hover:bg-red-700"
          >
            View Committees
          </a>
          <a
            href="/calendar"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Check Events
          </a>
        </div>
      </div>
    </div>
  );
}
