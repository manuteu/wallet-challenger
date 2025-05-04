import { prisma } from '@/shared/lib/prisma';
import { transferApiSchema } from '@/modules/transaction/schemas';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/shared/utils/auth-helpers';

export async function POST(req: Request) {
  const userOrError = await getUserFromRequest(req);
  if (userOrError instanceof NextResponse) return userOrError;

  const userId = userOrError;

  const body = await req.json();
  const parsed = transferApiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { amount, receiverEmail } = parsed.data;

  const sender = await prisma.user.findUnique({ where: { id: userId } });
  const receiver = await prisma.user.findUnique({
    where: { email: receiverEmail },
  });

  if (!sender || !receiver) {
    return NextResponse.json(
      { error: 'Usuário remetente ou destinatário não encontrado' },
      { status: 404 }
    );
  }

  if (sender.balance < amount) {
    return NextResponse.json({ error: 'Saldo insuficiente' }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        amount,
        type: 'TRANSFER',
        status: 'COMPLETED',
        senderId: sender.id,
        receiverId: receiver.id,
      },
    }),
    prisma.user.update({
      where: { id: sender.id },
      data: { balance: sender.balance - amount },
    }),
    prisma.user.update({
      where: { id: receiver.id },
      data: { balance: receiver.balance + amount },
    }),
  ]);

  return NextResponse.json({ message: 'Transferência realizada com sucesso' });
}
