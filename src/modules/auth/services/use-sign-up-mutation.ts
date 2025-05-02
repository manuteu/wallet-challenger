'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/lib/axios';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export function useSignUpMutation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess,
    onError: () => {
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
    },
  });
}
