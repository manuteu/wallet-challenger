import { prisma } from '@/shared/lib/prisma';
import { revertSchema } from '@/modules/transaction/schemas';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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

  try {
    await prisma.$transaction(async (tx) => {
      if (transaction.type === 'DEPOSIT') {
        await tx.user.update({
          where: { id: transaction.senderId },
          data: { balance: { decrement: transaction.amount } },
        });
      }
      if (transaction.type === 'TRANSFER') {
        await tx.user.update({
          where: { id: transaction.senderId },
          data: { balance: { increment: transaction.amount } },
        });

        await tx.user.update({
          where: { id: transaction.receiverId },
          data: { balance: { decrement: transaction.amount } },
        });
      }

      await tx.transaction.update({
        where: { id: transactionId },
        data: { status: 'REVERSED' },
      });
    });
    return NextResponse.json({ message: 'Transação revertida com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
