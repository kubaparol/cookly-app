import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import { inter } from '@/constants/fonts';

import { ThemeProvider } from '@/components/providers/theme-provider';
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}

            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
