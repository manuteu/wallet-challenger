import { api } from '@/shared/lib/axios';

export async function revertTransaction(id: string): Promise<void> {
  await api.post(`/transaction/revert`, { transactionId: id });
}
