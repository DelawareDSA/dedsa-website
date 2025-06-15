import { EventDisplay } from '@/core/components/events';
import type {
  CampaignsSectionContent,
  EventsSectionContent,
  HeroSectionContent,
  JoinSectionContent,
  LeadershipSectionContent,
  MeetingInfoSectionContent,
  UdYdsaPageContent,
} from '@/core/types/pages/ud-ydsa';

type Props = UdYdsaPageContent;

export default function UdYdsaPage(props: Props) {
  const {
    hero,
    campaignsSection,
    eventsSection,
    meetingInfoSection,
    leadershipSection,
    joinSection,
  } = props;

  return (
    <div className="min-h-screen bg-dsa-red-t4">
      {/* passes only the hero object */}
      <HeroSection hero={hero} />

      {/* passes only campaigns array */}
      <CampaignsSection campaigns={campaignsSection.campaigns} />

      {/* eventsSection already has the right shape */}
      <EventsSection {...eventsSection} />
    </div>
  );
}

// Hero Section
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

// Campaigns Section
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

// Events Section
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

// Meeting Info Section
function MeetingInfoSection(props: MeetingInfoSectionContent) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              {props.meetingInfoTitle}
            </h2>
            <div className="space-y-2">
              <p>
                <strong>{props.meetingWhenLabel}:</strong> Second Tuesday of
                each month, 7:00 PM
              </p>
              <p>
                <strong>{props.meetingWhereLabel}:</strong> Morris Library, Room
                202
              </p>
              <p>
                <strong>{props.meetingEmailLabel}:</strong>{' '}
                udydsa@delawardsa.org
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">{props.followTitle}</h2>
            <div className="flex space-x-4">
              {Object.entries(props.socialLinks).map(([key, link]) => (
                <a
                  key={key}
                  href={link.href}
                  className="text-dsa-red hover:text-red-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Leadership Section
function LeadershipSection({
  leaders,
  contactLinkText,
  contactLinkHref,
}: LeadershipSectionContent) {
  return (
    <section className="py-16">
      <div className="container-page">
        <h2 className="mb-8 text-3xl font-bold">Chapter Leadership</h2>
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {leaders?.map(
            (
              leader: LeadershipSectionContent['leaders'][number],
              index: number
            ) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-dsa-red">
                  {leader.imageInitials}
                </div>
                <h3 className="font-bold">{leader.name}</h3>
                <p className="text-dsa-black">{leader.role}</p>
              </div>
            )
          )}
        </div>
        <div className="text-center">
          <a href={contactLinkHref} className="text-dsa-red hover:underline">
            {contactLinkText}
          </a>
        </div>
      </div>
    </section>
  );
}

// Join Section
function JoinSection({ title, description, buttonText }: JoinSectionContent) {
  return (
    <section className="py-16 text-white bg-dsa-red">
      <div className="text-center container-page">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-xl">{description}</p>
        <a
          href="/join"
          className="bg-white btn text-dsa-red hover:bg-dsa-red-t4"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
