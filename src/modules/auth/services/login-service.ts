import { api } from "@/shared/lib/axios";
import { LoginSchemaType } from "../schemas";

export const authLogin = async (data: LoginSchemaType) => {
  const response = await api.post('/auth/login', data);
  return response.data;
}