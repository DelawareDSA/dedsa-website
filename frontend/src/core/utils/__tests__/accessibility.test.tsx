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

function calculateContrastRatio(
  background: string,
  foreground: string
): number {
  // Helper function to get relative luminance
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;

    const [rL, gL, bL] = [r, g, b].map((component) => {
      const c = component / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
  };

  const backgroundLuminance = getLuminance(background);
  const foregroundLuminance = getLuminance(foreground);

  const lighter = Math.max(backgroundLuminance, foregroundLuminance);
  const darker = Math.min(backgroundLuminance, foregroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}
