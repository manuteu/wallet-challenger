import { api } from "@/shared/lib/axios";
import { TransactionResponse } from "../types/dashboard-types";

export const getTransactions = async () => {
  const { data } = await api.get<TransactionResponse[]>('/dashboard/transactions');
  return data;
}