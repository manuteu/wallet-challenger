'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/lib/axios';
import { storageKeys } from '@/shared/config/storage-keys';
import useAuthStore from '@/shared/store/authStore';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string;
  password: string;
};

export function useLoginMutation(onSuccess?: () => void) {
  const { changeAuthStatus } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess,
    onError: () => {
      alert('Login falhou. Verifique suas credenciais.');
    },
  });
}
