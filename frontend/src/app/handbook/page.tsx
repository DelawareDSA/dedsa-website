import handbookContent from '@/core/content/pages/handbook.json';
import HandbookPage from '@/features/handbook/Page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership Handbook',
  description:
    'Your comprehensive guide to getting involved with Delaware DSA - from new member orientation to organizing campaigns.',
};

/**
 * This `Page` is a Next.js server component (no custom props),
 * so it satisfies App Router requirements.
 */
export default function Page() {
  return <HandbookPage data={handbookContent} />;
}
