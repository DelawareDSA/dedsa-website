import './globals.css';

import { ThemeProvider } from '@/app/theme/ThemeProvider';
import Footer from '@/core/components/layout/Footer';
import Header from '@/core/components/layout/Header';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import MainWrapper from './MainWrapper';
import PageTransition from './PageTransition';
import { Providers } from './providers';

const styreneB = localFont({
  src: [
    {
      path: '../../public/fonts/StyreneB-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/StyreneB-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-styrene-b',
  display: 'swap',
});

const manifoldDSA = localFont({
  src: [
    {
      path: '../../public/fonts/ManifoldDSA-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ManifoldDSA-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ManifoldDSA-ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-manifold-dsa',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Delaware DSA',
    default: 'Delaware DSA | Democratic Socialists of America',
  },
  description:
    'The Delaware chapter of the Democratic Socialists of America (DSA). Member-run, progressive activism since 2021.',
  icons: {
    icon: [{ url: '/dedsa-logo.png' }],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manifoldDSA.variable} ${styreneB.variable}`}>
      <body className="flex flex-col min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <Providers>
          <ThemeProvider>
            <Header />
            <MainWrapper>
              <PageTransition>{children}</PageTransition>
            </MainWrapper>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
