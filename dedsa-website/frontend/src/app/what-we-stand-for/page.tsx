import { contentService } from '@/core/services/contentService';
import type {
  PositionCardContent,
  WhatWeStandForPageContent,
} from '@/core/types/pages/whatWeStandFor';
import WhatWeStandForFeature from '@/features/what-we-stand-for';

export default function WhatWeStandForPage() {
  const data = contentService.getPageContent(
    'whatWeStandFor'
  ) as WhatWeStandForPageContent & {
    positionCard: PositionCardContent;
  };
  return <WhatWeStandForFeature {...data} />;
}
