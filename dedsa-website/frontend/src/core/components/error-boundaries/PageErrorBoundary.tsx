'use client';
import ErrorBoundary from './ErrorBoundary';

export default function PageErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        <p className="p-4 text-center">An unexpected error occurred.</p>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
