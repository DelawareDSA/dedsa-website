import type {
  ChapterStructureContent,
  GovernanceProcessContent,
  LeadershipCardContent,
  LeadershipPageContent,
  OfficerStructureContent,
} from '@/core/types/pages/leadership';

type Props = LeadershipPageContent & {
  chapterStructure: ChapterStructureContent;
  leadershipCard: LeadershipCardContent;
  officerStructure?: OfficerStructureContent;
  governanceProcess?: GovernanceProcessContent;
};

export default function LeadershipPage(props: Props) {
  const {
    title,
    introContent,
    fallbackContent,
    chapterStructure,
    officerStructure,
    governanceProcess,
  } = props;

  return (
    <div className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="container-page">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="mb-6 text-4xl font-bold">{title}</h1>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: introContent || fallbackContent,
            }}
          />
        </div>

        {/* Chapter Structure Section */}
        <ChapterStructure {...chapterStructure} />

        {/* Officer Structure Section */}
        {officerStructure && <OfficerStructure {...officerStructure} />}

        {/* Governance Process Section */}
        {governanceProcess && <GovernanceProcess {...governanceProcess} />}

        {/* Current Leadership Cards */}
      </div>
    </div>
  );
}

// Chapter Structure Component
function ChapterStructure(props: ChapterStructureContent) {
  const {
    title,
    description,
    structureItems,
    meetingsInfo,
    bylawsLinkText,
    bylawsLinkHref,
  } = props;

  return (
    <section className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-3xl font-bold">{title}</h2>
      <p className="mb-6 text-lg">{description}</p>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(structureItems).map(([key, item]) => (
          <div key={key} className="pl-4 border-l-4 border-dsa-red">
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-dsa-black">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg bg-gray-50">
        <p className="mb-4">{meetingsInfo}</p>
        <a
          href={bylawsLinkHref}
          className="font-medium text-dsa-red hover:underline"
        >
          {bylawsLinkText} →
        </a>
      </div>
    </section>
  );
}

// Officer Structure Component
function OfficerStructure(props: OfficerStructureContent) {
  const { title, description, officers, diversityRequirements } = props;

  return (
    <section className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-3xl font-bold">{title}</h2>
      <p className="mb-6 text-lg">{description}</p>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        {officers.map((officer, index) => (
          <div key={index} className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold">{officer.position}</h3>
              <span className="px-3 py-1 text-sm text-white rounded-full bg-dsa-red">
                {officer.count}
              </span>
            </div>
            <div className="mb-4">
              <h4 className="mb-2 font-medium">Responsibilities:</h4>
              <p className="text-sm text-dsa-black">
                {officer.responsibilities}
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Requirements:</h4>
              <p className="text-sm text-dsa-black">{officer.requirements}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-l-4 border-yellow-400 rounded-lg bg-yellow-50">
        <h3 className="mb-3 text-lg font-semibold">Diversity Requirements</h3>
        <ul className="space-y-2 text-sm">
          <li>• {diversityRequirements.genderRequirement}</li>
          <li>• {diversityRequirements.bipocRequirement}</li>
        </ul>
        <p className="mt-3 text-xs text-gray-600">
          {diversityRequirements.note}
        </p>
      </div>
    </section>
  );
}

// Governance Process Component
function GovernanceProcess(props: GovernanceProcessContent) {
  const { title, description, processes } = props;

  return (
    <section className="p-8 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-3xl font-bold">{title}</h2>
      <p className="mb-6 text-lg">{description}</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {processes.map((process, index) => (
          <div key={index} className="p-6 rounded-lg bg-gray-50">
            <h3 className="mb-3 text-lg font-semibold">{process.title}</h3>
            <p className="text-sm text-dsa-black">{process.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Leadership Section Component (for current leadership when available)
function LeadershipSection() {
  return (
    <section className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-3xl font-bold">Current Chapter Leadership</h2>
      <div className="py-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium">
            Leadership Profiles Coming Soon
          </h3>
          <p className="mb-6 text-sm text-gray-600">
            We're currently updating our leadership profiles. Check back soon to
            meet our elected officers and branch chairs.
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              Questions about chapter leadership?{' '}
              <a href="/contact" className="text-dsa-red hover:underline">
                Contact us
              </a>
            </p>
            <p className="text-sm">
              Interested in running for office?{' '}
              <a href="/bylaws" className="text-dsa-red hover:underline">
                Learn about our election process
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
