'use client';

import type { ReactNode } from 'react';
import { Parallax } from 'react-parallax';

interface ParallaxSectionProps {
  children: ReactNode;
  image: string;
}

export default function ParallaxSection({
  children,
  image,
}: ParallaxSectionProps) {
  return (
    <Parallax bgImage={image} strength={200}>
      {children}
    </Parallax>
  );
}
