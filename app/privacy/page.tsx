import Link from "next/link";

export const metadata = {
  title: "Privacy Policy – Addecay",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Account information: email address and password when you register.",
      "Usage data: pages visited, features used, and actions taken within the platform.",
      "Payment information: processed securely by Stripe — we never store your card details.",
      "Content you create: ad scripts, generated images, and video assets stored to power your workspace.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To provide, maintain, and improve the Addecay platform.",
      "To process payments and manage your subscription.",
      "To send important service updates and, with your consent, product news.",
      "To analyse aggregate usage trends and improve AI model quality.",
    ],
  },
  {
    title: "Data Sharing",
    content: [
      "We do not sell your personal data to third parties.",
      "We share data with trusted service providers (Stripe, Vercel, Fal.ai, PostHog) solely to operate the platform.",
      "We may disclose data when required by law or to protect the rights of Addecay and its users.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "We retain your account data for as long as your account is active.",
      "Generated assets are stored for 30 days after your subscription ends, then permanently deleted.",
      "You may request deletion of your account and associated data at any time.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "We use essential cookies for authentication and session management.",
      "Analytics cookies (PostHog) help us understand how the platform is used. You can opt out at any time.",
      "No third-party advertising cookies are used.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "Access, correct, or delete your personal data at any time via your account settings.",
      "Request a portable copy of your data.",
      "Withdraw consent for marketing communications.",
      "Lodge a complaint with your local data protection authority.",
    ],
  },
  {
    title: "Contact",
    content: [
      "Questions about this policy? Email us at support@addecay.app and we'll respond within 2 business days.",
    ],
  },
];

export default function PrivacyPage() {
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
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
          Last updated: April 2026
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 56, lineHeight: 1.7 }}>
          At Addecay, we take your privacy seriously. This policy explains what data we collect,
          why we collect it, and how we use it.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 20,
                  color: "#fff",
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {section.title}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {section.content.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      fontSize: 15,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{ color: "#a78bfa", marginTop: 2, flexShrink: 0 }}>–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px", marginTop: 64 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
          <Link href="/terms" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/contact" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
