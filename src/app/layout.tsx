import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Dion Store',
  description: 'Dion Store is a store for your favorite products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'h-full min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
