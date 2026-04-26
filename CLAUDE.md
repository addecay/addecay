# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build (runs TypeScript compiler + Next.js bundler)
npm run lint     # ESLint via next lint
```

There are no tests. `npm run build` is the primary correctness check — run it before committing to catch TypeScript errors and broken imports.

## Architecture

**Next.js 15 App Router** — all pages live in `app/` and are Server Components by default. Mark files `"use client"` only when they need browser APIs, hooks, or event handlers.

**Routing**
- `app/page.tsx` — marketing landing page (Server Component)
- `app/dashboard/page.tsx` — main product UI (Client Component, single large file)
- `app/privacy|terms|contact/page.tsx` — static legal/info pages
- `app/api/generate/*/route.ts` — API routes

**API Routes** (`app/api/generate/`)
- `stripe/route.ts` — creates Stripe Checkout sessions; resolves plan name → price ID via `PLAN_PRICE_IDS` map
- `stripe/webhook/route.ts` — receives Stripe events; `checkout.session.completed` and `customer.subscription.deleted` handlers are stubs
- `logo/route.ts` — calls Fal.ai `recraft-v3` with `vector_illustration` style; only route with a real AI backend connected

All other dashboard tools (AI Video, Voice, Sound Effects, Script, etc.) are UI-only mocks that show a placeholder string after a fake timeout.

**Styling conventions**
- Reusable component classes (`.btn-primary`, `.btn-secondary`, `.glass`, `.glass-hover`, `.gradient-text`, `.gradient-text-accent`) live in `@layer components` in `app/globals.css`
- CSS design tokens (`--background`, `--foreground`, `--surface`, `--border`) are defined in `:root` in `globals.css`
- Layout and one-off styles use inline `style` props directly — not Tailwind utility classes
- Tailwind classes are only used for typography, spacing utilities, and the component classes above

**Analytics**
- `app/providers.tsx` — `PHProvider` initialises PostHog client-side; wraps the whole app in `layout.tsx`
- `app/components/PostHogPageView.tsx` — fires `$pageview` on route changes; must be wrapped in `<Suspense>` because it calls `useSearchParams()`
- `app/components/PlanCTA.tsx` — client component that fires `plan_cta_clicked` event on pricing CTA clicks
- Vercel Analytics: `<Analytics />` from `@vercel/analytics/next` placed at the bottom of `<body>` in `layout.tsx`

## Environment Variables

All required vars are documented in `.env.example`. Key ones:

| Variable | Used by |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe checkout + webhook routes |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification |
| `NEXT_PUBLIC_STRIPE_*_PRICE_ID` | Pricing page CTAs (client-side) |
| `STRIPE_*_PRICE_ID` | Server-side plan → price ID resolution |
| `FAL_KEY` | Logo generation route |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics |
| `NEXTAUTH_URL` | Base URL for Stripe redirect URLs |

## Deployment

Hosted on Vercel. Pushes to `main` trigger production deployments. Feature work is done on `claude/*` branches with draft PRs. The `NEXTAUTH_URL` env var controls Stripe success/cancel redirect URLs — set it to the production domain in Vercel dashboard.
