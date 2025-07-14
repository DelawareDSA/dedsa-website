'use client';
import Image, { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
}

export default function OptimizedImage({ alt, ...props }: OptimizedImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
