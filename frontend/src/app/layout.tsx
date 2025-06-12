import { ThemeProvider } from '@/app/theme/ThemeProvider';
import Footer from '@/core/components/layout/Footer';
import Header from '@/core/components/layout/Header';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import './globals.css';
import { Providers } from './providers';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manifoldDSA.variable}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <ThemeProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
