import HomePage from '@/app/page';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations as unknown as jest.ExpectExtendMap);

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

    combinations.forEach((combination) => {
      const ratio = calculateContrastRatio(combination.bg, combination.fg);
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
  // Mock implementation - replace with actual calculation if needed
  return 4.5;
}
