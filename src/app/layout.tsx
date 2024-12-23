import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';

export const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Cookly',
    default: 'Cookly',
  },
  description: 'Cookly is a recipe sharing platform.',
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}

          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
