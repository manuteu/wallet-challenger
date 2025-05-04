import { prisma } from '@/shared/lib/prisma';
import { getUserFromRequest } from '@/shared/utils/auth-helpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const userOrError = await getUserFromRequest(req);
  if (userOrError instanceof NextResponse) return userOrError;

  const userId = userOrError;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json({ balance: user.balance });
}
