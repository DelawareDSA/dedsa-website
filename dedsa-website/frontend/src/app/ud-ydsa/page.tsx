import { contentService } from '@/core/services/contentService';
import type { UdYdsaPageContent } from '@/core/types/pages/ud-ydsa';
import UdYdsaFeature from '@/features/ud-ydsa';

export default function UdYdsaPage() {
  const data = contentService.getPageContent('udYdsa') as UdYdsaPageContent;
  return <UdYdsaFeature {...data} />;
}
