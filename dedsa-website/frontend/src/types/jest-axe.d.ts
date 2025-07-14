declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';
  import { MatcherFunction } from 'expect';

  export function axe(
    html: string | HTMLElement,
    options?: import('axe-core').RunOptions
  ): Promise<AxeResults>;
  export const toHaveNoViolations: MatcherFunction<[AxeResults?]>;
}
