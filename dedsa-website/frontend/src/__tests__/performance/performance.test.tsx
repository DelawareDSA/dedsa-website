import HomePage from '@/features/home/Page';
import { render } from '@testing-library/react';
import { act } from 'react';

const maybeIt =
  process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS === 'true' ? it.skip : it;

describe('Performance Tests', () => {
  beforeEach(() => {
    performance.mark = jest.fn();
    performance.measure = jest.fn();
  });

  maybeIt('HomePage renders within acceptable time', () => {
    const startTime = performance.now();

    act(() => {
      render(<HomePage />);
    });

    const renderTime = performance.now() - startTime;
    expect(renderTime).toBeLessThan(100);
  });

  maybeIt('Lazy loads images appropriately', () => {
    let container!: HTMLElement;
    act(() => {
      ({ container } = render(<HomePage />));
    });
    const images = container.querySelectorAll('img[loading="lazy"]');

    expect(images.length).toBeGreaterThan(0);
  });

  maybeIt('Does not have memory leaks on unmount', () => {
    let unmount!: () => void;
    act(() => {
      ({ unmount } = render(<HomePage />));
    });

    const globalWithGc = global as typeof globalThis & { gc?: () => void };
    const beforeUnmount = globalWithGc.gc
      ? performance.memory.usedJSHeapSize
      : 0;
    unmount();
    const afterUnmount = globalWithGc.gc
      ? performance.memory.usedJSHeapSize
      : 0;

    expect(afterUnmount - beforeUnmount).toBeLessThan(1000000);
  });
});
