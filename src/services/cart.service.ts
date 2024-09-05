import { QueryFunctionContext } from '@tanstack/react-query';

import apiInstance from '@/lib/api-instance';

export const cartServices = {
  async list({ queryKey }: QueryFunctionContext) {
    const [, params] = queryKey;
    const response = await apiInstance.get('/carts', { params });
    return response.data;
  },
};
