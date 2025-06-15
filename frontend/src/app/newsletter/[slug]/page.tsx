import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsletterPageClient from './client';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const newsletters = {
  'march-2024': {
    id: 'march-2024',
    title: 'Delaware DSA March 2024 Newsletter',
    date: '2024-03-01',
    author: 'Delaware DSA Communications Committee',
    excerpt:
      'Updates on our organizing efforts, upcoming events, and member spotlights.',
    content: `
      <h2>Message from the Chair</h2>
      <p>Comrades, as we move through March, our organizing efforts continue to gain momentum. This month has been marked by significant victories in our housing justice campaign and growing membership engagement.</p>
      
      <h2>Campaign Updates</h2>
      <h3>Housing Justice</h3>
      <p>Our tenant organizing efforts have resulted in three successful rent strikes this month. We've helped over 50 families avoid eviction and secured heating repairs for dozens of units across Wilmington.</p>
      
      <h3>Healthcare for All</h3>
      <p>The Medicare for All campaign is building steam with weekly phone banks and our upcoming healthcare town hall scheduled for April 15th.</p>
      
      <h2>Member Spotlight</h2>
      <p>This month we're highlighting the incredible work of Sarah Martinez, who has been leading our mutual aid food distribution program...</p>
      
      <h2>Upcoming Events</h2>
      <ul>
        <li>April 15: Healthcare Town Hall</li>
        <li>April 22: Earth Day Climate Action</li>
        <li>April 28: Monthly General Meeting</li>
      </ul>
    `,
    tags: ['organizing', 'housing', 'healthcare', 'mutual aid'],
    featured: true,
  },
  'february-2024': {
    id: 'february-2024',
    title: 'Delaware DSA February 2024 Newsletter',
    date: '2024-02-01',
    author: 'Delaware DSA Communications Committee',
    excerpt:
      'Building momentum in the new year with exciting campaigns and actions.',
    content: `
      <h2>New Year, New Organizing</h2>
      <p>February has been a month of renewed energy and commitment to our shared values of democratic socialism.</p>
      
      <h2>Membership Growth</h2>
      <p>We welcomed 25 new members this month, bringing our total active membership to over 200 comrades!</p>
      
      <h2>Legislative Updates</h2>
      <p>Our lobbying efforts for paid sick leave legislation are showing promise, with several legislators expressing support.</p>
    `,
    tags: ['membership', 'legislation', 'organizing'],
    featured: false,
  },
  latest: {
    id: 'latest',
    title: 'Delaware DSA Latest Newsletter',
    date: '2024-06-01',
    author: 'Delaware DSA Communications Committee',
    excerpt: 'Our most recent updates and upcoming summer activities.',
    content: `
      <h2>Summer Organizing Season</h2>
      <p>As we head into summer, we're ramping up our outdoor organizing efforts and community engagement.</p>
      
      <h2>Pride Month Activities</h2>
      <p>Join us for Pride events throughout June as we stand in solidarity with our LGBTQ+ comrades.</p>
      
      <h2>Electoral Organizing</h2>
      <p>With local elections approaching, we're endorsing progressive candidates who align with our values.</p>
    `,
    tags: ['summer', 'pride', 'electoral', 'community'],
    featured: true,
  },
};

async function getNewsletter(slug: string) {
  const newsletter = newsletters[slug as keyof typeof newsletters];
  if (!newsletter) {
    return null;
  }
  return newsletter;
}

export default async function NewsletterPage({ params }: PageProps) {
  const { slug } = await params;

  const newsletter = await getNewsletter(slug);

  if (!newsletter) {
    notFound();
  }

  const publishDate = new Date(newsletter.date);
  const allNewsletters = Object.values(newsletters);
  const otherNewsletters = allNewsletters.filter((n) => n.id !== newsletter.id);

  return (
    <NewsletterPageClient
      newsletter={newsletter}
      publishDate={publishDate}
      otherNewsletters={otherNewsletters}
    />
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = await getNewsletter(slug);

  if (!newsletter) {
    return {
      title: 'Newsletter Not Found | Delaware DSA',
      description: 'The requested newsletter could not be found.',
    };
  }

  return {
    title: `${newsletter.title} | Delaware DSA`,
    description: newsletter.excerpt,
    openGraph: {
      title: newsletter.title,
      description: newsletter.excerpt,
      type: 'article',
      publishedTime: newsletter.date,
      authors: [newsletter.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: newsletter.title,
      description: newsletter.excerpt,
    },
    alternates: {
      canonical: `/newsletter/${newsletter.id}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(newsletters).map((slug) => ({
    slug,
  }));
}
