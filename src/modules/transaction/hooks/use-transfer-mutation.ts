import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastObserver } from '@/core/observers/toast-observer';
import { handleApiError } from '@/core/handlers/handle-api-error';
import { sendTransfer } from '../services/transfer-service';

export function useTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toastObserver.emit({
        type: 'success',
        title: 'Transferência realizada!',
        description: 'Seu saldo foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
