import { verifyToken } from './auth';
import { NextResponse } from 'next/server';

export async function getUserFromRequest(req: Request): Promise<string | NextResponse> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Token ausente' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    return decoded.userId;
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
