'use client'

import { Input } from '@/shared/ui/input'
import { formatCurrency } from '@/shared/utils/formatters'
import { UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type MoneyInputProps = {
  label?: string
  name: string
  value: string
  register: UseFormRegisterReturn
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  error?: string
}

export const MoneyInput = ({
  label,
  value,
  register,
  setValue,
  error,
}: MoneyInputProps) => {

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatCurrency(rawValue);
    setValue("amount", formattedValue, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        {...register}
        value={value || 'R$ 0,00'}
        onChange={handleMoneyChange}
        placeholder='R$ 0,00'
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
