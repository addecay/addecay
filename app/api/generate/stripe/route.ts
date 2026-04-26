import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Maps plan names to env-configured Stripe price IDs.
// The caller may also pass an explicit priceId to bypass this map.
const PLAN_PRICE_IDS: Record<string, string | undefined> = {
  starter:  process.env.STRIPE_STARTER_PRICE_ID,
  growth:   process.env.STRIPE_GROWTH_PRICE_ID,
  pro:      process.env.STRIPE_PRO_PRICE_ID,
  business: process.env.STRIPE_BUSINESS_PRICE_ID,
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });
  try {
    const { priceId, plan, userEmail } = await req.json();

    const resolvedPriceId =
      priceId ?? (plan ? PLAN_PRICE_IDS[String(plan).toLowerCase()] : undefined);

    if (!resolvedPriceId) {
      return NextResponse.json(
        { error: 'Missing priceId or unrecognised plan' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: resolvedPriceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL || 'https://addecay.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'https://addecay.vercel.app'}/`,
      customer_email: userEmail,
      metadata: { plan: plan ?? '', priceId: resolvedPriceId },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
