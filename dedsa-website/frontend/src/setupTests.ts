import '@testing-library/jest-dom';
import 'whatwg-fetch';

class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

jest.setTimeout(10000);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

Object.defineProperty(performance, 'now', {
  writable: true,
  value: jest.fn(() => 0),
});
