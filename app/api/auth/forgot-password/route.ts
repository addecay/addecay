import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const { email } = await req.json() as { email?: string };
  if (!email?.trim()) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const normalised = email.toLowerCase().trim();

  // Always return success — don't reveal whether email exists
  const user = await prisma.user.findUnique({ where: { email: normalised } });
  if (!user) return NextResponse.json({ ok: true });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { email: normalised } }),
    prisma.passwordResetToken.create({ data: { email: normalised, token, expiresAt } }),
  ]);

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Addecay <noreply@addecay.com>',
      to: normalised,
      subject: 'Reset your Addecay password',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#08080a;color:#e2e2e2">
          <div style="margin-bottom:32px">
            <span style="display:inline-block;width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#d946ef);text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#fff">A</span>
            <span style="font-size:16px;font-weight:600;color:#fff;margin-left:8px;vertical-align:middle">addecay</span>
          </div>
          <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;letter-spacing:-0.02em">Reset your password</h1>
          <p style="color:rgba(255,255,255,0.5);margin:0 0 28px;font-size:14px;line-height:1.6">
            Click the button below to choose a new password. This link expires in 1 hour.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#d946ef);color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
            Reset password
          </a>
          <p style="color:rgba(255,255,255,0.25);font-size:12px;margin-top:28px">
            If you didn't request this, you can safely ignore it.
          </p>
        </div>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
