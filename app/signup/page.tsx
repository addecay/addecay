'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    // Auto sign-in after successful registration
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Account created — please sign in.');
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div style={{ background: '#08080a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 40 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>A</div>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>addecay</span>
      </Link>

      <div style={{ width: '100%', maxWidth: 380, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 32px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Create your account</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 28px' }}>Start making AI video ads for free</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Name <span style={{ color: 'rgba(255,255,255,0.25)' }}>(optional)</span></label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Password <span style={{ color: 'rgba(255,255,255,0.25)' }}>(min. 8 characters)</span></label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#f87171', margin: 0, padding: '10px 12px', background: 'rgba(248,113,113,0.08)', borderRadius: 8, border: '1px solid rgba(248,113,113,0.2)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: '24px 0 0', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>Sign in</Link>
        </p>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', margin: '16px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
          By signing up you agree to our{' '}
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
