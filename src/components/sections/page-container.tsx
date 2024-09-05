'use client';

import { useState } from 'react';

import { HeaderStore } from '@/components/sections/header';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderStore isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <main className="container mx-auto flex-grow p-4">{children}</main>
    </div>
  );
}
