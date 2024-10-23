import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import { inter } from '@/constants';

import { Toaster } from '@/components/ui/sonner';

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

          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
