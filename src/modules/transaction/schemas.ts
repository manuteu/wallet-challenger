import { z } from 'zod';

const amountSchema = z
  .string()
  .transform((value) => {
    const digitsOnly = value.replace(/\D/g, '');
    return Number(digitsOnly) || 0;
  })
  .refine((value) => value >= 0, {
    message: 'O valor não pode ser negativo',
  });

export const depositFormSchema = z.object({
  amount: amountSchema,
});

export const depositApiSchema = z.object({
  amount: z.number().min(1, 'O valor não pode ser negativo'),
});

export type DepositFormInput = z.input<typeof depositFormSchema>;
export type DepositFormOutput = z.output<typeof depositFormSchema>;

export const transferFormSchema = z.object({
  amount: amountSchema,
  receiverEmail: z.string().email(),
});

export const transferApiSchema = z.object({
  amount: z.number().min(1, 'O valor não pode ser negativo'),
  receiverEmail: z.string().email(),
});

export type TransferFormInput = z.input<typeof transferFormSchema>;
export type TransferFormOutput = z.output<typeof transferFormSchema>;

export const revertSchema = z.object({
  transactionId: z.string().min(1, 'ID da transação obrigatório'),
});

export type RevertSchemaType = z.infer<typeof revertSchema>;
