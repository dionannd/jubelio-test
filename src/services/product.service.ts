import { QueryFunctionContext } from '@tanstack/react-query';

import apiInstance from '@/lib/api-instance';

import { TProduct, TResponseProduct } from '@/types/product';

export const productServices = {
  async list({ queryKey }: QueryFunctionContext): Promise<TResponseProduct> {
    const [, params] = queryKey;
    const { q, category } = params as { q?: string; category?: string };

    const url = q
      ? `/products/search`
      : category
        ? `/products/category/${category}`
        : `/product`;
    const response = await apiInstance.get(url, { params });
    return response.data;
  },

  async getProduct({ queryKey }: QueryFunctionContext): Promise<TProduct> {
    const [, params] = queryKey;
    const { id } = params as { id: number };
    const response = await apiInstance.get(`/products/${id}`);
    return response.data;
  },

  async listCategories() {
    const response = await apiInstance.get('/products/category-list');
    return response.data;
  },
};
