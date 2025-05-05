'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransferMutation } from '../hooks/use-transfer-mutation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { transferFormSchema, TransferFormOutput, TransferFormInput } from '../schemas';
import { MoneyInput } from '@/shared/ui/money-input';
import { useModal } from '@/shared/store/modal-store';
import { Spinner } from '@/shared/ui/spinner';

export function TransferForm() {
  const { mutate, isPending } = useTransferMutation();
  const { closeModal } = useModal()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch
  } = useForm<TransferFormInput, any, TransferFormOutput>({
    resolver: zodResolver(transferFormSchema),
  });

  const onSubmit = (data: TransferFormOutput) => {
    mutate(data, {
      onSuccess: () => {
        reset()
        closeModal()
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Email do destinatário</Label>
        <Input type="email" {...register('receiverEmail')} />
        {errors.receiverEmail && <p className="text-sm text-red-500">{errors.receiverEmail.message}</p>}
      </div>
      <div>
        <MoneyInput
          name="amount"
          label="Valor da transferência"
          register={register('amount')}
          setValue={setValue}
          watch={watch}
          value={watch('amount')}
          error={errors.amount?.message}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending && <Spinner size="sm" className='border-primary-foreground' />}
        Transferir
      </Button>
    </form>
  );
}
