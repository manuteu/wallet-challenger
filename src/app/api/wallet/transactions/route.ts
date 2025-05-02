import { prisma } from '@/shared/lib/prisma';
import { getUserFromRequest } from '@/shared/utils/auth-helpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const userOrError = await getUserFromRequest(req);
  if (userOrError instanceof NextResponse) return userOrError;

  const userId = userOrError;

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { name: true } },
      receiver: { select: { name: true } },
    },
  });

  return NextResponse.json(transactions);
}
