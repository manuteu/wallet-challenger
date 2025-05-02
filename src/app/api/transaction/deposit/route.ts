import { prisma } from '@/shared/lib/prisma';
import { depositSchema } from '@/modules/wallet/schemas';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/shared/utils/auth-helpers';

export async function POST(req: Request) {
  const userOrError = await getUserFromRequest(req);
  if (userOrError instanceof NextResponse) return userOrError;

  const userId = userOrError;

  const body = await req.json();
  const parsed = depositSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { amount } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

  const newBalance = user.balance + amount;

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        amount,
        type: 'DEPOSIT',
        status: 'COMPLETED',
        senderId: userId,
        receiverId: userId,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    }),
  ]);

  return NextResponse.json({ message: 'Depósito realizado com sucesso', newBalance });
}
