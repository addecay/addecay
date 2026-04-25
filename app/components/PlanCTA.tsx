'use client';

import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

interface Props {
  plan: string;
  price: string;
  cta: string;
  highlight: boolean;
}

export function PlanCTA({ plan, price, cta, highlight }: Props) {
  const posthog = usePostHog();

  return (
    <Link
      href="/dashboard"
      className={highlight ? 'btn-primary' : 'btn-secondary'}
      style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}
      onClick={() =>
        posthog?.capture('plan_cta_clicked', { plan, price })
      }
    >
      {cta}
    </Link>
  );
}
