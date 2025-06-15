import { render, screen } from '@testing-library/react';
import { act } from 'react';
import HeroSection from '../HeroSection';

import type { PropsWithChildren } from 'react';

jest.mock('framer-motion', () => ({
  motion: {
    section: ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    div: ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
    span: ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <span {...props}>{children}</span>
    ),
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
      screen.getByText('Building working-class power across Delaware')
    ).toBeInTheDocument();
  });

  maybeIt('renders tagline and description', () => {
    act(() => {
      render(<HeroSection />);
    });
    expect(
      screen.getByText('Member-run organizing since 2021')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Building working-class power across Delaware through democratic organizing.'
      )
    ).toBeInTheDocument();
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
