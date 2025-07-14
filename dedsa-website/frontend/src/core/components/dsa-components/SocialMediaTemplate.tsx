import Image from 'next/image';
import { DSALogo } from './DSALogo';

interface SocialMediaTemplateProps {
  platform: 'instagram' | 'twitter' | 'facebook' | 'tiktok';
  campaign: string;
  message: string;
  cta: string;
  image?: string;
}

export const SocialMediaTemplate = ({
  platform,
  campaign,
  message,
  cta,
  image,
}: SocialMediaTemplateProps) => {
  const specs = {
    instagram: { width: 1080, height: 1350, ratio: '4:5' },
    twitter: { width: 1600, height: 900, ratio: '16:9' },
    facebook: { width: 1200, height: 630, ratio: '1.9:1' },
    tiktok: { width: 1080, height: 1920, ratio: '9:16' },
  };

  const spec = specs[platform];

  return (
    <div
      className="social-template relative overflow-hidden"
      style={{
        width: `${spec.width}px`,
        height: `${spec.height}px`,
        aspectRatio: spec.ratio,
      }}
    >
      {}
      <div className="absolute top-0 left-0 right-0 h-24 bg-dsa-red flex items-center px-8">
        <DSALogo variant="white" size="small" />
      </div>

      {}
      <div className="pt-32 px-8 pb-8 h-full flex flex-col">
        <h1 className="font-styrene-b text-4xl mb-4">{message}</h1>
        <div className="flex-grow">
          {image && (
            <Image
              src={image}
              alt="Social media post"
              width={spec.width}
              height={spec.height}
            />
          )}
        </div>
        <div className="mt-auto">
          <p className="font-manifold-dsa font-bold text-2xl mb-2">{cta}</p>
          <p className="text-dsa-black-t2">@{campaign}_DSA</p>
        </div>
      </div>
    </div>
  );
};
