import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        // Auto-elevate to admin if email matches ADMIN_EMAIL env var
        if (
          process.env.ADMIN_EMAIL &&
          user.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() &&
          !user.isAdmin
        ) {
          await prisma.user.update({ where: { id: user.id }, data: { isAdmin: true } });
          user.isAdmin = true;
        }

        return { id: user.id, email: user.email, name: user.name ?? undefined, plan: user.plan, isAdmin: user.isAdmin };
      },
    }),
  ],
});
