import { render, screen } from '@testing-library/react';
import ErrorBoundaryWrapper from '../ErrorBoundaryWrapper';

const ProblemChild = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Child</div>;
};

describe('ErrorBoundaryWrapper', () => {
  const origError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = origError;
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundaryWrapper>
        <ProblemChild />
      </ErrorBoundaryWrapper>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('shows fallback on error', () => {
    render(
      <ErrorBoundaryWrapper>
        <ProblemChild shouldThrow />
      </ErrorBoundaryWrapper>
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
