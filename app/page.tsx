import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l1.8 5.6H18l-4.9 3.5 1.9 5.7L10 13.3l-5 3.5 1.9-5.7L2 7.6h6.2L10 2z" fill="currentColor" />
      </svg>
    ),
    title: "Script Generation",
    desc: "AI writes high-converting ad scripts tailored to your brand, audience, and campaign objective in seconds.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8l5 2.5L8 13V8z" fill="currentColor" />
      </svg>
    ),
    title: "Runway AI Video",
    desc: "Transform text prompts into cinematic video clips with state-of-the-art generative video AI.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 13l3 5M14.5 13l-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Image to Video",
    desc: "Animate product photos and brand assets into motion graphics for any ad platform.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 10a6 6 0 0 0 12 0M10 16v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Voice Dubbing",
    desc: "Professional AI voiceovers in 40+ languages. Clone your brand voice or choose from our library.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h2l2-5 3 10 2-7 2 4 2-2h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sound Effects",
    desc: "Generate custom soundscapes, jingles, and SFX tuned to your ad's mood and pacing.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Competitor Intel",
    desc: "Reverse-engineer top-performing ads in your market with AI-powered creative analysis.",
  },
];

const steps = [
  {
    num: "01",
    title: "Write your script",
    desc: "Describe your product, audience, and goal — or let AI generate the perfect script from scratch.",
  },
  {
    num: "02",
    title: "Generate visuals",
    desc: "Turn text into video with Runway AI or animate your own product images and brand assets.",
  },
  {
    num: "03",
    title: "Polish and publish",
    desc: "Add voice, music, and sound effects then export directly to any ad platform.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Try it out, no credit card required.",
    features: [
      "2 video ads per month",
      "Script generation",
      "Runway & Pika video",
      "Basic voice dubbing",
    ],
    cta: "Get started free",
    highlight: false,
    launchBadge: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    desc: "For solo creators and small brands.",
    features: [
      "5 video ads per month",
      "Script generation",
      "Runway & Pika video",
      "Voice dubbing (5 voices)",
      "Competitor intel",
    ],
    cta: "Get started",
    highlight: false,
    launchBadge: true,
  },
  {
    name: "Growth",
    price: "$39",
    period: "/month",
    desc: "For growing teams and content creators.",
    features: [
      "10 video ads per month",
      "All AI tools included",
      "Voice dubbing (15 voices)",
      "Full competitor intel",
      "Priority generation",
    ],
    cta: "Start growing",
    highlight: false,
    launchBadge: true,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    desc: "For power users and agencies.",
    features: [
      "Unlimited video ads",
      "All 7 AI tools included",
      "Voice cloning",
      "Full competitor intel suite",
      "Priority generation queue",
    ],
    cta: "Start free trial",
    highlight: true,
    launchBadge: false,
  },
  {
    name: "Business",
    price: "$299",
    period: "/month",
    desc: "For agencies and enterprise teams.",
    features: [
      "Unlimited video ads",
      "All 7 AI tools included",
      "Voice cloning",
      "Team collaboration",
      "API access",
      "White label",
      "Dedicated support",
    ],
    cta: "Contact sales",
    highlight: false,
    launchBadge: false,
  },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          background: "rgba(8, 8, 10, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
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
          <span style={{ fontWeight: 600, color: "#fff", fontSize: 15, letterSpacing: "-0.02em" }}>
            addecay
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["#features", "#how-it-works", "#pricing"].map((href, i) => (
            <Link
              key={href}
              href={href}
              style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.15s" }}
              className="nav-link"
            >
              {["Features", "How it works", "Pricing"][i]}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/dashboard"
            style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
          >
            Sign in
          </Link>
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: 14 }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "100px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="animate-fade-in"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            maxWidth: 860,
            margin: "0 auto",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
              fontSize: 12,
              color: "#c4b5fd",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#a78bfa",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            AI-powered video ad creation
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(42px, 7vw, 76px)",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            <span className="gradient-text">Create 60-second</span>
            <br />
            <span className="gradient-text-accent">video ads with AI</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.38)",
              maxWidth: 520,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Script, generate, dub, and publish high-converting video ads in
            minutes. Seven AI tools in one studio.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <Link href="/dashboard" className="btn-primary" style={{ fontSize: 14, padding: "12px 24px" }}>
              Start creating free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="#features" className="btn-secondary" style={{ fontSize: 14, padding: "12px 24px" }}>
              See how it works
            </Link>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}>
            No credit card required · Cancel anytime
          </p>
        </div>

        {/* Dashboard preview */}
        <div
          className="animate-slide-up"
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: 64,
            width: "100%",
            maxWidth: 960,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.08)",
            animationDelay: "0.15s",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {["rgba(255,95,87,0.5)", "rgba(255,189,68,0.5)", "rgba(40,201,64,0.5)"].map((bg, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: bg }} />
            ))}
            <div
              style={{
                marginLeft: 12,
                height: 22,
                width: 260,
                borderRadius: 5,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </div>

          {/* App chrome */}
          <div style={{ display: "flex", height: 240 }}>
            {/* Sidebar preview */}
            <div
              style={{
                width: 180,
                borderRight: "1px solid rgba(255,255,255,0.05)",
                padding: "12px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {[
                { label: "Script Generator", active: true },
                { label: "AI Video", active: false },
                { label: "Image → Video", active: false },
                { label: "Voice Dubbing", active: false },
                { label: "Sound FX", active: false },
                { label: "Competitor Intel", active: false },
              ].map(({ label, active }) => (
                <div
                  key={label}
                  style={{
                    padding: "7px 10px",
                    borderRadius: 7,
                    fontSize: 11,
                    color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)",
                    background: active ? "rgba(255,255,255,0.08)" : "transparent",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Content preview */}
            <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ height: 10, width: "30%", borderRadius: 5, background: "rgba(255,255,255,0.07)" }} />
              <div
                style={{
                  height: 90,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    height: 32,
                    width: 100,
                    borderRadius: 8,
                    background: "rgba(139,92,246,0.25)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                />
                <div
                  style={{
                    height: 32,
                    width: 72,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{ padding: "96px 32px", maxWidth: 1120, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#a78bfa",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 16,
            }}
          >
            Everything you need
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
            className="gradient-text"
          >
            Seven tools. One studio.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", maxWidth: 420, margin: "0 auto" }}>
            All the AI tools you need to produce professional video ads — without stitching together ten different platforms.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="glass glass-hover"
              style={{ borderRadius: 16, padding: "28px 28px 28px", cursor: "default" }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a78bfa",
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        style={{
          padding: "96px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#a78bfa",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 16,
              }}
            >
              Process
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
              className="gradient-text"
            >
              From idea to ad in minutes
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ position: "relative" }}>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      left: "100%",
                      width: "100%",
                      height: 1,
                      background: "linear-gradient(to right, rgba(255,255,255,0.07), transparent)",
                      zIndex: 0,
                    }}
                  />
                )}
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    marginBottom: 16,
                    lineHeight: 1,
                  }}
                  className="gradient-text-accent"
                >
                  {s.num}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        style={{
          padding: "96px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#a78bfa",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 16,
              }}
            >
              Pricing
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: "0 0 12px",
              }}
              className="gradient-text"
            >
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", margin: 0 }}>
              Start free. Scale as you grow.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="glass"
                style={{
                  borderRadius: 20,
                  padding: 24,
                  position: "relative",
                  ...(plan.highlight
                    ? {
                        borderColor: "rgba(139,92,246,0.3)",
                        boxShadow: "0 0 60px rgba(139,92,246,0.12), 0 0 0 1px rgba(139,92,246,0.15)",
                      }
                    : {}),
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -13,
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "4px 14px",
                      borderRadius: 999,
                      background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most popular
                  </div>
                )}
                {plan.launchBadge && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: "rgba(251,191,36,0.1)",
                      border: "1px solid rgba(251,191,36,0.25)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#fbbf24",
                      marginBottom: 12,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✦ Launch Price
                  </div>
                )}

                <div style={{ marginBottom: 28 }}>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      margin: "0 0 10px",
                    }}
                  >
                    {plan.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span
                      style={{
                        fontSize: 44,
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>{plan.period}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "8px 0 0" }}>
                    {plan.desc}
                  </p>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "#a78bfa", flexShrink: 0 }}>
                        <path
                          d="M2 7l3.5 3.5L12 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={plan.highlight ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", justifyContent: "center", fontSize: 14 }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              A
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>addecay</span>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}>
            &copy; 2026 Addecay. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms"].map((label) => (
              <Link
                key={label}
                href="#"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
