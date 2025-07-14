import { EventDisplay } from '@/core/components/events';
import type {
  CampaignsSectionContent,
  EventsSectionContent,
  HeroSectionContent,
  UdYdsaPageContent,
} from '@/core/types/pages/ud-ydsa';

type Props = UdYdsaPageContent;

export default function UdYdsaPage(props: Props) {
  const { hero, campaignsSection, eventsSection } = props;

  return (
    <div className="min-h-screen bg-dsa-red-t4">
      {}
      <HeroSection hero={hero} />

      {}
      <CampaignsSection campaigns={campaignsSection.campaigns} />

      {}
      <EventsSection {...eventsSection} />
    </div>
  );
}

function HeroSection({ hero }: { hero: HeroSectionContent }) {
  return (
    <section className="py-20 text-white bg-gradient-to-r from-dsa-red to-red-700">
      <div className="container-page">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">{hero.title}</h1>
        <p className="text-xl md:text-2xl">{hero.subtitle}</p>
      </div>
    </section>
  );
}

function CampaignsSection({
  campaigns,
}: {
  campaigns: CampaignsSectionContent['campaigns'];
}) {
  return (
    <section className="py-16">
      <div className="container-page">
        <h2 className="mb-8 text-3xl font-bold">Current Campaigns</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {campaigns?.map(
            (
              campaign: CampaignsSectionContent['campaigns'][number],
              index: number
            ) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-3 text-xl font-bold">{campaign.title}</h3>
                <p className="mb-4 text-dsa-black">{campaign.description}</p>
                <a
                  href={campaign.linkHref}
                  className="text-dsa-red hover:underline"
                >
                  {campaign.linkText}
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function EventsSection({
  upcomingEvents,
  viewAllLinkText,
  viewAllLinkHref,
}: EventsSectionContent) {
  return (
    <section className="py-16 bg-white">
      <div className="container-page">
        <h2 className="mb-8 text-3xl font-bold">Upcoming Events</h2>
        <div className="mb-8 space-y-4">
          {upcomingEvents?.map((event, index) => (
            <EventDisplay key={index} event={event} />
          ))}
        </div>
        <a href={viewAllLinkHref} className="text-dsa-red hover:underline">
          {viewAllLinkText}
        </a>
      </div>
    </section>
  );
}
