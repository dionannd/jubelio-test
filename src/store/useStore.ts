import { devtools, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { TUser } from '@/types/user';

type TStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

export const useStore = createWithEqualityFn<TStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: TUser | null) => set({ user }),
      }),
      {
        name: '@store',
      },
    ),
  ),
);
