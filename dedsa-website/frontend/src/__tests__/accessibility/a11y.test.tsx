import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/features/home/Page';
import Header from '@/core/components/layout/Header';
import Footer from '@/core/components/layout/Footer';

expect.extend(toHaveNoViolations as unknown as jest.ExpectExtendMap);

describe('Accessibility Tests', () => {
  it('Header has no accessibility violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Footer has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('HomePage has proper heading hierarchy', () => {
    const { container } = render(<HomePage />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

    let previousLevel = 0;
    headings.forEach((heading) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      expect(currentLevel).toBeLessThanOrEqual(previousLevel + 1);
      previousLevel = currentLevel;
    });
  });

  it('All images have alt text', () => {
    const { container } = render(<HomePage />);
    const images = container.querySelectorAll('img');

    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
    });
  });

  it('All form inputs have labels', () => {
    const { container } = render(<HomePage />);
    const inputs = container.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
      const label = container.querySelector(`label[for="${input.id}"]`);
      expect(label).toBeInTheDocument();
    });
  });
});
