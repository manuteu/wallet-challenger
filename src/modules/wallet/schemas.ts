import { z } from 'zod';

export const depositSchema = z.object({
  amount: z.number().positive('O valor deve ser positivo'),
});

export const transferSchema = z.object({
  amount: z.number().positive(),
  receiverEmail: z.string().email(),
});

export const revertSchema = z.object({
  transactionId: z.string().min(1, 'ID da transação obrigatório'),
});
