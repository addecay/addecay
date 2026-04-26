import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

// Price ID → plan name map (mirrors PLAN_PRICE_IDS in stripe/route.ts)
function planFromPriceId(priceId: string): string {
  const map: Record<string, string> = {
    [process.env.STRIPE_STARTER_PRICE_ID ?? '']: 'starter',
    [process.env.STRIPE_GROWTH_PRICE_ID   ?? '']: 'growth',
    [process.env.STRIPE_PRO_PRICE_ID      ?? '']: 'pro',
    [process.env.STRIPE_BUSINESS_PRICE_ID ?? '']: 'business',
  };
  return map[priceId] ?? 'starter';
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email ?? session.customer_details?.email;
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const plan = (session.metadata?.plan as string | undefined) ?? 'starter';

        if (email) {
          await prisma.user.update({
            where: { email: email.toLowerCase() },
            data: {
              plan,
              ...(customerId ? { stripeCustomerId: customerId } : {}),
            },
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { plan: 'free' },
        });
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
        const priceId = sub.items.data[0]?.price?.id;
        if (priceId) {
          await prisma.user.updateMany({
            where: { stripeCustomerId: customerId },
            data: { plan: planFromPriceId(priceId) },
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error('Webhook DB error:', err);
    // Still return 200 so Stripe doesn't retry endlessly
  }

  return NextResponse.json({ received: true });
}
