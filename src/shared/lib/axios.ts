import axios from 'axios';
import { storageKeys } from '@/shared/config/storage-keys';
import { logout } from '@/modules/auth/services/logout-service';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem(storageKeys.accessToken) : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout()
    }
    return Promise.reject(error);
  }
);