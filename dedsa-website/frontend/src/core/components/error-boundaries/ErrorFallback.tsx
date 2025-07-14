'use client';
import React from 'react';

export default function ErrorFallback() {
  return (
    <div role="alert" className="p-4 text-center">
      <p>Something went wrong.</p>
    </div>
  );
}
