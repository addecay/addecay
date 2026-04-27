import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json() as { token?: string; password?: string };

  if (!token || !password || password.length < 8) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Reset link is invalid or expired.' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { email: record.email }, data: { password: hashed } }),
    prisma.passwordResetToken.delete({ where: { token } }),
  ]);

  return NextResponse.json({ ok: true });
}
