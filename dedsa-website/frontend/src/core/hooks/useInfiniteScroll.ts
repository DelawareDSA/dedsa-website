import { useCallback, useEffect, useRef, useState } from 'react';

import { UseInfiniteScrollProps } from '@/core/types/hooks';

export function useInfiniteScroll({
  threshold = 100,
  onLoadMore,
}: UseInfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setIsLoading(true);
        try {
          await onLoadMore();
        } finally {
          setIsLoading(false);
        }
      }
    },
    [onLoadMore, isLoading]
  );

  useEffect(() => {
    const options = {
      rootMargin: `${threshold}px`,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  return {
    targetRef,
    isLoading,
  };
}
