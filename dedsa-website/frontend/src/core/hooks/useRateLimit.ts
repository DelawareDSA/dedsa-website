import { useRef } from 'react';

export function useRateLimit(interval: number) {
  const lastRef = useRef(0);

  return () => {
    const now = Date.now();
    if (now - lastRef.current < interval) return false;
    lastRef.current = now;
    return true;
  };
}
