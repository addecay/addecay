'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PLANS = ['free', 'starter', 'growth', 'pro', 'business'];

type User = {
  id: string;
  email: string;
  name: string | null;
  plan: string;
  isAdmin: boolean;
  videosGenerated: number;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((d) => { setUsers(d.users ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updatePlan(id: string, plan: string) {
    setUpdating(id);
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, plan }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, plan } : u));
    }
    setUpdating(null);
  }

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users.length,
    paid: users.filter((u) => u.plan !== 'free').length,
    videos: users.reduce((sum, u) => sum + u.videosGenerated, 0),
  };

  return (
    <div style={{ background: '#08080a', minHeight: '100vh', color: '#e2e2e2', fontFamily: 'inherit' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>A</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>addecay</span>
          </Link>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Admin</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: 12, color: '#a78bfa', textDecoration: 'none' }}>← Dashboard</Link>
      </header>

      <main style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total users', value: stats.total },
            { label: 'Paid users', value: stats.paid },
            { label: 'Videos generated', value: stats.videos },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search by email or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', maxWidth: 360, padding: '9px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const }}
          />
        </div>

        {/* Table */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['User', 'Plan', 'Videos', 'Joined', ''].map((h) => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>No users found</td></tr>
              ) : filtered.map((user, i) => (
                <tr key={user.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {(user.name?.[0] ?? user.email[0]).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, color: '#fff', fontWeight: 500 }}>
                          {user.name ?? user.email}
                          {user.isAdmin && <span style={{ marginLeft: 6, fontSize: 10, color: '#a78bfa', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '1px 5px' }}>admin</span>}
                        </p>
                        {user.name && <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{user.email}</p>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <select
                      value={user.plan}
                      disabled={updating === user.id}
                      onChange={(e) => updatePlan(user.id, e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', fontSize: 12, padding: '5px 8px', cursor: 'pointer', outline: 'none', opacity: updating === user.id ? 0.5 : 1 }}
                    >
                      {PLANS.map((p) => <option key={p} value={p} style={{ background: '#1a1a2e' }}>{p}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{user.videosGenerated}</td>
                  <td style={{ padding: '14px 20px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                    {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {updating === user.id && (
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(139,92,246,0.3)', borderTopColor: '#a78bfa', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
