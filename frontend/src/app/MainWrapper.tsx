'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface MainWrapperProps {
  children: React.ReactNode;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <main id="main" className={`flex-grow ${isHomePage ? '' : 'pt-20'}`}>
      {children}
    </main>
  );
}
