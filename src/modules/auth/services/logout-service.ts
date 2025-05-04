'use client';

import { storageKeys } from '@/shared/config/storage-keys';
import authStore from '@/shared/store/auth-store';
import userStore from '@/shared/store/user-store';

export function logout() {
  authStore.getState().changeAuthStatus(false);
  userStore.getState().clearUser();

  if (typeof window !== 'undefined') {
    window.location.href = '/login';
    sessionStorage.removeItem(storageKeys.accessToken);
    sessionStorage.removeItem(storageKeys.user);
  }
}
