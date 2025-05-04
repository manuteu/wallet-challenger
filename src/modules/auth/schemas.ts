import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(8, 'A Senha deve ter no máximo 8 caracteres'),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha inválida'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
