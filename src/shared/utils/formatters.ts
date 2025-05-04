import { StatusType } from '@/modules/dashboard/types/dashboard-types';

export const formatCurrency = (value: string | number): string => {
  const digitsOnly = value?.toString().replace(/\D/g, '');
  const number = Number(digitsOnly) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

export const parseBRLToNumber = (value: string) => {
  const numeric = value.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseInt(numeric) || 0;
};

export const translateTransactionsStatus = (value: StatusType) => {
  const status: Record<StatusType, string> = {
    COMPLETED: 'Concluída',
    REVERSED: 'Estornada',
  };

  return status[value];
};
