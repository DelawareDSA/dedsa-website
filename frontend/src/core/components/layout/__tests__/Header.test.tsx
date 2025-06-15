import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Header from '../Header';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import type { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: ImageProps) => <img {...props} />,
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders logo and site name', () => {
    render(<Header />);
    expect(screen.getByAltText('DSA logo')).toBeInTheDocument();
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();
  });

  it('shows all navigation items on desktop', () => {
    render(<Header />);
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('What We Stand For')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('toggles mobile menu when button clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle navigation menu');

    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('applies transparent header on home page', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
  });

  it('applies white background when scrolled', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white');
  });
});
