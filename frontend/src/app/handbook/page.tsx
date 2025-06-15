import handbookContent from '@/core/content/pages/handbook.json';
import HandbookPage from '@/features/handbook/Page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership Handbook',
  description:
    'Your comprehensive guide to getting involved with Delaware DSA - from new member orientation to organizing campaigns.',
};

export default function Page() {
  return <HandbookPage data={handbookContent} />;
}
