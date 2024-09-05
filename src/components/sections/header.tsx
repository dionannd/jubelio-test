import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { shallow } from 'zustand/shallow';

import { ThemeToggle } from '@/components/button/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const {
    cart,
    remove: removeFromCart,
    add: updateCart,
    removeProduct,
    removeAll,
  } = useCartStore((state) => {
    return {
      cart: state.cart,
      remove: state.remove,
      add: state.add,
      removeProduct: state.removeProduct,
      removeAll: state.removeAll,
    };
  }, shallow);

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href="/">
            <h1 className="text-2xl font-bold">Dion Store</h1>
          </Link>
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
                <ScrollArea className="mt-4 h-[calc(100vh-250px)]">
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
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeFromCart(item.id as number)}
                            disabled={item.quantity === 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="text"
                            value={item.quantity}
                            disabled
                            className="w-12 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateCart(item)}
                            disabled={item.quantity === item.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProduct(item.id as number)}
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
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full">Checkout</Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={removeAll}
                  >
                    Remove All
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
