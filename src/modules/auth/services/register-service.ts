import { api } from '@/shared/lib/axios';
import { RegisterSchemaType } from '../schemas';

export const authRegister = async (data: RegisterSchemaType) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
