import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastObserver } from '@/core/observers/toast-observer';
import { sendDeposit } from '../services/deposit-serivce';
import { handleApiError } from '@/core/handlers/handle-api-error';

export function useDepositMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toastObserver.emit({
        type: 'success',
        title: 'Depósito realizado!',
        description: 'Seu saldo foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
