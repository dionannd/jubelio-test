import { TProduct } from '@/types/product';

export type TCart = {
  count: number;
} & TProduct;
