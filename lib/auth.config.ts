import type { NextAuthConfig } from 'next-auth';

// Edge-safe config — no bcryptjs, no Prisma imports.
// Used by middleware.ts which runs on the Edge runtime.
// lib/auth.ts extends this with the Credentials provider (Node.js only).
export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as { plan?: string }).plan ?? 'free';
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { plan?: string }).plan = token.plan as string;
      }
      return session;
    },
  },
};
