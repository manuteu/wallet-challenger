import { api } from '@/shared/lib/axios';
import { BalanceResponse } from '../types/dashboard-types';

export const getBalance = async () => {
  const { data } = await api.get<BalanceResponse>('/dashboard/balance');
  return data.balance;
};
