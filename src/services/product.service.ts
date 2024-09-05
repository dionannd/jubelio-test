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

  async save(data: TProduct): Promise<TProduct> {
    const response = await apiInstance.post('/products/add', data);
    return response.data;
  },

  async update(data: TProduct): Promise<TProduct> {
    const { id } = data;
    delete data.id;

    const response = await apiInstance.put(`/products/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await apiInstance.delete(`/products/${id}`);
    return response.data;
  },
};
