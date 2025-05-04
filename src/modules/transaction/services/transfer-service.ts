import { api } from "@/shared/lib/axios";
import { TransferFormOutput } from "../schemas";

export const sendTransfer = async (data: TransferFormOutput) => {
  const response = await api.post('/transaction/transfer', data);
  return response.data;
}