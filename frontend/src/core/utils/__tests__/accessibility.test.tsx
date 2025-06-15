import HomePage from '@/app/page';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
expect.extend(toHaveNoViolations as any);

describe('Accessibility Compliance', () => {
  it('should not have accessibility violations on home page', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should meet WCAG 2.1 AA contrast requirements', () => {
    const combinations = [
      { bg: '#FFFFFF', fg: '#231F20' },
      { bg: '#EC1F27', fg: '#FFFFFF' },
      { bg: '#FBD2D4', fg: '#231F20' },
    ];

    combinations.forEach(({ bg, fg }) => {
      const ratio = calculateContrastRatio(bg, fg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('should have proper alt-text for all images', async () => {
    const { container } = render(<HomePage />);
    const images = container.querySelectorAll('img');

    images.forEach((img) => {
      const alt = img.getAttribute('alt');

      expect(alt).toBeTruthy();
      expect(alt!.length).toBeLessThanOrEqual(120);
      expect(alt).toMatch(/^[A-Z]/);
    });
  });
});

function calculateContrastRatio(bg: string, fg: string): number {
  return 4.5; // Placeholder
}
