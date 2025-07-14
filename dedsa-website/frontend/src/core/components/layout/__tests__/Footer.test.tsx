import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders organization name and description', () => {
    render(<Footer />);
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();
    expect(
      screen.getByText(/Member-run, democratic socialist organization/)
    ).toBeInTheDocument();
  });

  it('renders all footer sections', () => {
    render(<Footer />);
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Get Involved')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`))
    ).toBeInTheDocument();
  });
});
