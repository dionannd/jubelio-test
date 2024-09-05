import { devtools, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { TProduct } from '@/types/product';

type TCart = {
  quantity: number;
} & TProduct;

type CartStore = {
  cart: TCart[];
  count: () => number;
  add: (product: TProduct) => void;
  remove: (id: number) => void;
  removeProduct: (id: number) => void;
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
              .map((item) => item.quantity)
              .reduce((prev, curr) => prev + curr, 0);
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
        removeProduct: (id: number) => {
          const { cart } = get();
          const updatedCart = cart.filter((item) => item.id !== id);
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
  const productIndex = cart.findIndex((item) => item.id === product.id);

  if (productIndex === -1) {
    return [...cart, { ...product, quantity: 1 } as unknown as TCart];
  }

  const updatedCart = [...cart];
  updatedCart[productIndex] = {
    ...updatedCart[productIndex],
    quantity: updatedCart[productIndex].quantity + 1,
  };

  return updatedCart;
}

function removeCart(idProduct: number, cart: TCart[]): TCart[] {
  return cart
    .map((item) => {
      if (item.id === idProduct)
        return { ...item, quantity: item.quantity - 1 };
      return item;
    })
    .filter((item) => {
      return item.quantity;
    });
}
