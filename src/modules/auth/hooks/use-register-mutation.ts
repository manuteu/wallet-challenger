'use client';

import { useMutation } from '@tanstack/react-query';
import { handleApiError } from '@/core/handlers/handle-api-error';
import { authRegister } from '../services/register-service';
import { RegisterResponse } from '../types/auth-types';

export function useRegisterMutation(onSuccess?: (data: RegisterResponse) => void) {
  return useMutation({
    mutationFn: authRegister,
    onSuccess,
    onError: (error) => {
      handleApiError(error);
    },
  });
}
