import { registerSchema } from '@/modules/auth/schemas';
import { prisma } from '@/shared/lib/prisma';
import { hashPassword } from '@/shared/utils/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error?.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, password } = parsed.data;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return NextResponse.json(
      { error: 'E-mail já cadastrado' },
      { status: 409 }
    );
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  return NextResponse.json({
    message: 'Usuário criado',
    user: { id: user.id, email: user.email },
  });
}
