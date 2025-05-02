import { storageKeys } from '@/shared/config/storage-keys';
import { create } from 'zustand';
import { useEffect } from 'react';

type State = {
  isAuthenticated: boolean;
};

type Action = {
  changeAuthStatus: (status: boolean) => void;
};

const authStore = create<State & Action>((set) => ({
  isAuthenticated: false,
  changeAuthStatus: (status: boolean) => set(() => ({ isAuthenticated: status })),
}));

export const useAuthStore = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const changeAuthStatus = authStore((state) => state.changeAuthStatus);

  useEffect(() => {
    const token = sessionStorage.getItem(storageKeys.accessToken);
    changeAuthStatus(!!token);
  }, []);

  return { isAuthenticated, changeAuthStatus };
};

export default useAuthStore;
