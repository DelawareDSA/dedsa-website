'use client';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>;
}
