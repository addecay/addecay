import Link from 'next/link';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export const metadata = { title: 'Payment confirmed – Addecay' };

async function getSession(sessionId: string) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' });
    return await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] });
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect('/');

  const session = await getSession(session_id);
  const plan = (session?.metadata?.plan as string | undefined) ?? 'Pro';

  return (
    <div style={{ background: '#08080a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', color: '#e2e2e2' }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 48 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>A</div>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>addecay</span>
      </Link>

      <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
        {/* Check */}
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l6 6L23 8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          You&apos;re on {plan.charAt(0).toUpperCase() + plan.slice(1)}
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: '0 0 40px' }}>
          Your subscription is active. Head to the studio to start creating video ads.
        </p>

        <Link
          href="/dashboard"
          className="btn-primary"
          style={{ justifyContent: 'center', width: '100%', fontSize: 15, padding: '12px 24px' }}
        >
          Go to Studio
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>
          Receipt sent to {session?.customer_email ?? 'your email'}.{' '}
          <Link href="/contact" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Need help?</Link>
        </p>
      </div>
    </div>
  );
}
