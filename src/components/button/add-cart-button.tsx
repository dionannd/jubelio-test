'use client';

import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { shallow } from 'zustand/shallow';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { useCartStore } from '@/store/useCartStore';

import { TProduct } from '@/types/product';

type AddCartButtonProps = {
  product: TProduct;
  className?: string;
};

export function AddCartButton({ product, className }: AddCartButtonProps) {
  const { add: addToCart, cart } = useCartStore((state) => {
    return {
      add: state.add,
      cart: state.cart,
    };
  }, shallow);

  const handleAddToCart = (product: TProduct) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const totalQuantity = productInCart.quantity + 1;

      if (totalQuantity > product.stock) {
        toast.error('Out of stock');
      } else {
        addToCart({ ...product, quantity: 1 } as TProduct);
        toast.success('Product added to cart');
      }
    } else {
      // Jika produk belum ada di keranjang
      if (product.stock < 1) {
        toast.error('Out of stock');
      } else {
        addToCart({ ...product, quantity: 1 } as TProduct);
        toast.success('Product added to cart');
      }
    }
  };

  return (
    <Button
      className={cn('w-full flex-1', className)}
      onClick={() => handleAddToCart(product)}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
