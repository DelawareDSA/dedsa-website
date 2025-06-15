import privacyContent from '@/core/content/pages/privacy.json';
import PrivacyPage from '@/features/privacy/Page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Delaware DSA',
  description:
    'Learn how Delaware DSA collects, uses, and protects your personal information. Our commitment to privacy and data transparency.',
  openGraph: {
    title: 'Privacy Policy | Delaware DSA',
    description:
      'Learn how Delaware DSA collects, uses, and protects your personal information.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Delaware DSA',
    description:
      'Learn how Delaware DSA collects, uses, and protects your personal information.',
  },
  alternates: {
    canonical: '/privacy',
  },
};

/**
 * This `Page` is a Next.js server component (no custom props),
 * so it satisfies App Router requirements.
 */
export default function Page() {
  return <PrivacyPage data={privacyContent} />;
}
