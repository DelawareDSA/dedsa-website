import { contentService } from '@/core/services/contentService';
import type { NewsletterPageContent } from '@/core/types/pages/newsletter';
import NewsletterFeature from '@/features/newsletter';

export default function NewsletterPage() {
  const data = contentService.getPageContent(
    'newsletter'
  ) as NewsletterPageContent;
  return <NewsletterFeature {...data} />;
}
