import { ShoppingCart, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useCartStore } from '@/store/useCartStore';

type HeaderStoreProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
};

export function HeaderStore({ isCartOpen, setIsCartOpen }: HeaderStoreProps) {
  const { cart, remove: removeFromCart } = useCartStore();

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto p-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold">Dion Store</h1>
          <div className="flex items-center space-x-4">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ScrollArea className="mt-4 h-[calc(100vh-200px)]">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">
                      $
                      {cart
                        .reduce((sum, item) => sum + item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full">Checkout</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
