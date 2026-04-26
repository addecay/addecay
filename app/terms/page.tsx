import Link from "next/link";

export const metadata = {
  title: "Terms of Service – Addecay",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Addecay, you agree to be bound by these Terms of Service.",
      "If you are using Addecay on behalf of a business, you represent that you have authority to bind that business to these terms.",
      "We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance.",
    ],
  },
  {
    title: "Your Account",
    content: [
      "You are responsible for maintaining the security of your account credentials.",
      "You must be at least 18 years old to use Addecay.",
      "One account per person or entity. You may not share accounts or create accounts for others without their consent.",
      "You agree to provide accurate information and keep it up to date.",
    ],
  },
  {
    title: "Acceptable Use",
    content: [
      "You may not use Addecay to generate content that is illegal, harmful, deceptive, or violates third-party rights.",
      "You may not reverse-engineer, scrape, or attempt to extract AI models or underlying infrastructure.",
      "You may not use the platform to generate spam, malware, or content that violates advertising platform policies.",
      "Automated access beyond normal usage (bots, crawlers) requires prior written approval.",
    ],
  },
  {
    title: "Content Ownership",
    content: [
      "You retain ownership of all content you create using Addecay.",
      "By uploading content, you grant us a limited licence to process and store it to deliver our services.",
      "You are responsible for ensuring you have the right to use any assets you upload (images, audio, brand materials).",
      "AI-generated outputs may be subject to limitations under applicable intellectual property law.",
    ],
  },
  {
    title: "Subscription and Billing",
    content: [
      "Paid plans are billed monthly or annually in advance. All charges are non-refundable except where required by law.",
      "You may cancel your subscription at any time. Access continues until the end of the current billing period.",
      "We reserve the right to change pricing with 30 days' notice. Existing subscribers will be notified by email.",
      "Failure to pay may result in suspension or termination of your account.",
    ],
  },
  {
    title: "Service Availability",
    content: [
      "We aim for 99.9% uptime but do not guarantee uninterrupted access.",
      "Scheduled maintenance will be announced in advance where possible.",
      "We are not liable for losses arising from downtime, AI model errors, or service interruptions.",
    ],
  },
  {
    title: "Termination",
    content: [
      "You may delete your account at any time from your account settings.",
      "We may suspend or terminate accounts that violate these terms, with or without notice.",
      "Upon termination, your data will be retained for 30 days before permanent deletion.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Addecay is provided 'as is' without warranties of any kind, express or implied.",
      "Our total liability to you for any claim is limited to the amount you paid in the 12 months prior to the claim.",
      "We are not liable for indirect, incidental, or consequential damages.",
    ],
  },
  {
    title: "Contact",
    content: [
      "Questions about these terms? Contact us at support@addecay.app.",
    ],
  },
];

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 56, lineHeight: 1.7 }}>
          Please read these terms carefully before using Addecay. They govern your access to and
          use of the platform and all related services.
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
          <Link href="/privacy" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/contact" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
