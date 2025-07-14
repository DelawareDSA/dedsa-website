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

export default function Page() {
  return <PrivacyPage data={privacyContent} />;
}
