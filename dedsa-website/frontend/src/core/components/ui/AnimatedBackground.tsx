'use client';

import { Player } from '@lottiefiles/react-lottie-player';

export default function AnimatedBackground() {
  return (
    <Player
      src="/animations/bg.json"
      loop
      autoplay
      className="absolute inset-0"
    />
  );
}
