import { HeaderStore } from '@/components/sections/header';

type PageContainerProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  children: React.ReactNode;
};

export function PageContainer({
  isCartOpen,
  setIsCartOpen,
  children,
}: PageContainerProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderStore isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <main className="container mx-auto flex-grow p-4">{children}</main>
    </div>
  );
}
