import { handleApiError } from '@/core/handlers/handle-api-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { revertTransaction } from '../services/revert-service';
import { toastObserver } from '@/core/observers/toast-observer';

export const useRevertTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revertTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toastObserver.emit({
        type: 'success',
        title: 'Transferência estornada!',
        description: 'Seu saldo foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      handleApiError(error);
    }
  });
};
