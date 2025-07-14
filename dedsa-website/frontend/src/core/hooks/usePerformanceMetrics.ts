import { useEffect } from 'react';

export function usePerformanceMetrics() {
  useEffect(() => {
    const t = performance.now();
    return () => {
      const diff = performance.now() - t;
      console.log('Component mounted for', diff, 'ms');
    };
  }, []);
}
