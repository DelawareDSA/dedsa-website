import { contentService } from '@/core/services/contentService';
import type { ContactPageContent } from '@/core/types/pages/contact';
import ContactFeature from '@/features/contact';

export default function ContactPage() {
  const pageData = contentService.getPageContent(
    'contact'
  ) as unknown as ContactPageContent;

  return <ContactFeature {...pageData} />;
}
