import { devtools, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { TCart } from '@/types/cart';
import { TProduct } from '@/types/product';

type CartStore = {
  cart: TCart[];
  count: () => number;
  add: (product: TProduct) => void;
  remove: (id: number) => void;
  removeAll: () => void;
};

export const useCartStore = createWithEqualityFn<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        count: () => {
          const { cart } = get();
          if (cart.length)
            return cart
              .map((item) => item.count)
              .reduce((prev, curr) => prev + curr);
          return 0;
        },
        add: (product: TProduct) => {
          const { cart } = get();
          const updatedCart = updateCart(product, cart);
          set({ cart: updatedCart });
        },
        remove: (id: number) => {
          const { cart } = get();
          const updatedCart = removeCart(id, cart);
          set({ cart: updatedCart });
        },
        removeAll: () => set({ cart: [] }),
      }),
      {
        name: '@store-cart',
      },
    ),
  ),
);

function updateCart(product: TProduct, cart: TCart[]): TCart[] {
  const cartItem = { ...product, count: 1 } as TCart;

  const productOnCart = cart.map((item) => item.id).includes(product.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === product.id)
        return { ...item, count: item.count + 1 } as TCart;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: number, cart: TCart[]): TCart[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
