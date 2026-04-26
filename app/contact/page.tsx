import Link from "next/link";

export const metadata = {
  title: "Contact – Addecay",
};

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "We aim to reply to all emails within 1–2 business days.",
  },
  {
    q: "I have a billing question.",
    a: "Email us with your account email and we'll sort it out. For urgent billing issues mention 'billing' in the subject line.",
  },
  {
    q: "Can I request a feature?",
    a: "Absolutely — we love hearing from users. Drop us a note with your idea and why it matters to you.",
  },
  {
    q: "I found a bug.",
    a: "Please email a description of what happened along with any relevant screenshots or steps to reproduce.",
  },
];

export default function ContactPage() {
  return (
    <div style={{ background: "#08080a", minHeight: "100vh", color: "#e2e2e2" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              A
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>addecay</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 32px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
          Contact Us
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 56, lineHeight: 1.7 }}>
          Have a question, feedback, or need help? We&apos;d love to hear from you.
        </p>

        {/* Email card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "36px 40px",
            marginBottom: 64,
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="5" width="18" height="13" rx="2.5" stroke="#a78bfa" strokeWidth="1.5" />
              <path d="M2 8l9 5.5L20 8" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 6px" }}>Email us at</p>
            <a
              href="mailto:support@addecay.app"
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#a78bfa",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              support@addecay.app
            </a>
          </div>
        </div>

        {/* FAQ */}
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 28,
            color: "#fff",
          }}
        >
          Common Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                padding: "24px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 500, color: "#fff", margin: "0 0 8px" }}>{faq.q}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.65 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px", marginTop: 64 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
          <Link href="/privacy" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
