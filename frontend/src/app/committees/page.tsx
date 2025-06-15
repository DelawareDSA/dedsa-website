import { contentService } from '@/core/services/contentService';
import type {
  CommitteeOrGroup,
  CommitteesPageContent,
} from '@/core/types/pages/committees';

export default function CommitteesPage() {
  const content = contentService.getPageContent(
    'committees'
  ) as CommitteesPageContent;

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Committees page content missing.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="container-page">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">{content.title}</h1>
          <p className="mb-4 text-xl text-dsa-black">{content.subtitle}</p>
          <p className="max-w-4xl text-lg text-dsa-black">
            {content.description}
          </p>
        </div>

        {/* Committees Section */}
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold">Committees</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {content.committees.map((committee) => (
              <CommitteeCard key={committee.title} item={committee} />
            ))}
          </div>
        </section>

        {/* Working Groups Section */}
        <section>
          <h2 className="mb-8 text-3xl font-bold">Working Groups</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {content.workingGroups.map((workingGroup) => (
              <CommitteeCard key={workingGroup.title} item={workingGroup} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CommitteeCard({ item }: { item: CommitteeOrGroup }) {
  return (
    <div className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <h3 className="mb-3 text-xl font-bold text-dsa-red">{item.title}</h3>

      <div className="mb-4">
        <h4 className="mb-2 font-semibold text-dsa-black">Purpose:</h4>
        <p className="text-dsa-black">{item.purpose}</p>
      </div>

      {item.privileges && item.privileges.length > 0 && (
        <div>
          <h4 className="mb-2 font-semibold text-dsa-black">Privileges:</h4>
          <ul className="space-y-1 list-disc list-inside">
            {item.privileges.map((privilege, index) => (
              <li key={index} className="text-sm text-dsa-black">
                {privilege}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
