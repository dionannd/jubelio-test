'use client';

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import apiInstance from '@/lib/api-instance';

import { useStore } from '@/store/useStore';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useStore();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await apiInstance.get('/auth/me');

        if (response.status === 401) {
          const resRefreshToken = await apiInstance.post('/auth/refresh', {
            refreshToken: Cookies.get('refreshToken'),
          });

          if (resRefreshToken.status === 200) {
            Cookies.set('token', resRefreshToken.data.token);
            Cookies.set('refreshToken', resRefreshToken.data.refreshToken);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, unused-imports/no-unused-vars
      } catch (error: any) {
        toast('Failed', {
          description: 'Token expired. Please login again.',
        });
      }
    };

    getAuth();
  }, [user]);

  return <>{children}</>;
}
