import axios from 'axios';

import { setupInterceptorsTo } from '@/lib/interceptor';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptorsTo(apiInstance);

export default apiInstance;
