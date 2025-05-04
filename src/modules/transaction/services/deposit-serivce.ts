import { api } from "@/shared/lib/axios";
import { DepositFormOutput } from "../schemas";

export const sendDeposit = async (data: DepositFormOutput) => {
  const response = await api.post('/transaction/deposit', data);
  return response.data;
}