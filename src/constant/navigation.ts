import { Home, Package2, ShoppingCart } from 'lucide-react';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  {
    name: 'Product',
    href: '/dashboard/product',
    icon: Package2,
  },
  {
    name: 'Cart',
    href: '/dashboard/cart',
    icon: ShoppingCart,
  },
];
