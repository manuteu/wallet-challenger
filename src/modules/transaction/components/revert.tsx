'use client';

import { DialogFooter } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useRevertTransaction } from '../hooks/user-revert-mutation';
import { useModal } from '@/shared/store/modal-store';

export const Revert = () => {
  const { mutate, isPending } = useRevertTransaction();
  const { closeModal, transactionId } = useModal()

  const handleRevert = () => {
    mutate(transactionId as string, {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <>
      <p>Tem certeza que deseja reverter esta transação?</p>

      <DialogFooter>
        <Button variant="outline" onClick={closeModal} disabled={isPending}>
          Cancelar
        </Button>
        <Button onClick={handleRevert} disabled={isPending}>
          {isPending ? 'Revertendo...' : 'Confirmar'}
        </Button>
      </DialogFooter>
    </>
  );
};
