'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setStatus('loading');
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json() as { error?: string };
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.');
      setStatus('idle');
    } else {
      setStatus('done');
      setTimeout(() => router.push('/login'), 2000);
    }
  }

  if (!token) {
    return (
      <p style={{ fontSize: 14, color: '#f87171', textAlign: 'center' }}>
        Invalid reset link. <Link href="/forgot-password" style={{ color: '#a78bfa' }}>Request a new one.</Link>
      </p>
    );
  }

  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Choose a new password</h1>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 28px' }}>Must be at least 8 characters.</p>

      {status === 'done' ? (
        <div style={{ padding: '14px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, fontSize: 14, color: '#4ade80', textAlign: 'center' }}>
          Password updated! Redirecting to sign in…
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>New password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#f87171', margin: 0, padding: '10px 12px', background: 'rgba(248,113,113,0.08)', borderRadius: 8, border: '1px solid rgba(248,113,113,0.2)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
          >
            {status === 'loading' ? 'Saving…' : 'Set new password'}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ background: '#08080a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 40 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>A</div>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>addecay</span>
      </Link>
      <div style={{ width: '100%', maxWidth: 380, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 32px' }}>
        <Suspense fallback={<p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading…</p>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
