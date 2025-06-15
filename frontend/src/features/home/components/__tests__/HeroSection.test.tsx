import { render, screen } from '@testing-library/react';
import { act } from 'react';
import HeroSection from '../HeroSection';

jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

const maybeIt =
  process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS === 'true' ? it.skip : it;

describe('HeroSection', () => {
  maybeIt('renders main heading and subheading', () => {
    act(() => {
      render(<HeroSection />);
    });
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();
    expect(
      screen.getByText('Building Power for Working People')
    ).toBeInTheDocument();
  });

  maybeIt('renders tagline and description', () => {
    act(() => {
      render(<HeroSection />);
    });
    expect(
      screen.getByText('Member-run, progressive activism since 2021')
    ).toBeInTheDocument();
    expect(screen.getByText(/We're building a democratic/)).toBeInTheDocument();
  });

  maybeIt('renders action buttons', () => {
    act(() => {
      render(<HeroSection />);
    });
    expect(screen.getByText('Join Our Chapter')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  maybeIt('has correct link destinations', () => {
    act(() => {
      render(<HeroSection />);
    });
    const joinLink = screen.getByText('Join Our Chapter').closest('a');
    const learnLink = screen.getByText('Learn More');

    expect(joinLink).toHaveAttribute('href', '/join');
    expect(learnLink).toHaveAttribute('href', '/about');
  });
});
