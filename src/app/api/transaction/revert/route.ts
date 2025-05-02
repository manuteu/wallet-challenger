import { prisma } from '@/shared/lib/prisma';
import { revertSchema } from '@/modules/wallet/schemas';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/shared/utils/auth-helpers';

export async function POST(req: Request) {
  const userOrError = await getUserFromRequest(req);
  if (userOrError instanceof NextResponse) return userOrError;

  const userId = userOrError;

  const body = await req.json();
  const parsed = revertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { transactionId } = parsed.data;

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction)
    return NextResponse.json(
      { error: 'Transação não encontrada' },
      { status: 404 }
    );

  if (transaction.status === 'REVERSED') {
    return NextResponse.json(
      { error: 'Transação já foi revertida' },
      { status: 400 }
    );
  }

  if (transaction.senderId !== userId) {
    return NextResponse.json(
      { error: 'Não autorizado a reverter esta transação' },
      { status: 403 }
    );
  }

  await prisma.$transaction([
    prisma.transaction.update({
      where: { id: transactionId },
      data: { status: 'REVERSED' },
    }),
    prisma.user.update({
      where: { id: transaction.senderId },
      data: { balance: { increment: transaction.amount } },
    }),
    prisma.user.update({
      where: { id: transaction.receiverId },
      data: { balance: { decrement: transaction.amount } },
    }),
  ]);

  return NextResponse.json({ message: 'Transação revertida com sucesso' });
}
