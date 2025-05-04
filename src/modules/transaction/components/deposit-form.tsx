'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDepositMutation } from '../hooks/use-deposit-mutation';
import { Button } from '@/shared/ui/button';
import { depositFormSchema, type DepositFormInput, DepositFormOutput } from '../schemas';
import { useModal } from '@/shared/store/modal-store';
import { MoneyInput } from '@/shared/ui/money-input';
import { Spinner } from '@/shared/ui/spinner';

export function DepositForm() {
  const { closeModal } = useModal()
  const { mutate, isPending } = useDepositMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<DepositFormInput, any, DepositFormOutput>({
    resolver: zodResolver(depositFormSchema),
  });

  const onSubmit = (data: DepositFormOutput) => {
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
        <MoneyInput
          name="amount"
          label="Valor do depósito"
          register={register('amount')}
          setValue={setValue}
          watch={watch}
          value={watch('amount')}
          error={errors.amount?.message}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        <div className='flex items-center gap-3'>
          {isPending && <Spinner size="sm" className='border-popover border-t-transparent' />}
          Depositar
        </div>
      </Button>
    </form>
  );
}
