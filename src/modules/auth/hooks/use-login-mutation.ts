'use client';

import { useMutation } from '@tanstack/react-query';
import { handleApiError } from '@/core/handlers/handle-api-error';
import { authLogin } from '../services/login-service';
import { LoginResponse } from '../types/auth-types';

export function useLoginMutation(onSuccess?: (data: LoginResponse) => void) {
  return useMutation({
    mutationFn: authLogin,
    onSuccess,
    onError: (error) => {
      handleApiError(error);
    },
  });
}
