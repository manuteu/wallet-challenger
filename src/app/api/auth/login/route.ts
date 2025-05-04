import { loginSchema } from '@/modules/auth/schemas';
import { prisma } from '@/shared/lib/prisma';
import { comparePassword, generateToken } from '@/shared/utils/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 400 });
  }

  const token = generateToken({ userId: user.id });

  return NextResponse.json({
    message: 'Autenticado',
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
