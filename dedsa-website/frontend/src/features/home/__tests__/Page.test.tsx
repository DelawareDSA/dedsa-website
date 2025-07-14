import { render, screen } from '@testing-library/react';
import HomePage from '../Page';

jest.mock('../components/HeroSection', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-section">Hero Section</div>,
}));

jest.mock('../components/MissionSection', () => ({
  __esModule: true,
  default: () => <div data-testid="mission-section">Mission Section</div>,
}));

jest.mock('../components/StrategicPrioritiesSection', () => ({
  __esModule: true,
  default: () => <div data-testid="priorities-section">Priorities Section</div>,
}));

describe('HomePage', () => {
  it('renders all required sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('mission-section')).toBeInTheDocument();
    expect(screen.getByTestId('priorities-section')).toBeInTheDocument();
  });

  it('renders sections in correct order', () => {
    render(<HomePage />);

    const sections = screen.getAllByTestId(/section$/);
    expect(sections[0]).toHaveAttribute('data-testid', 'hero-section');
    expect(sections[1]).toHaveAttribute('data-testid', 'mission-section');
    expect(sections[2]).toHaveAttribute('data-testid', 'priorities-section');
  });
});
