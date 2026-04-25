"use client";

import { useState } from "react";
import Link from "next/link";

const tools = [
  {
    id: "script",
    label: "Script Generator",
    desc: "Generate high-converting ad scripts",
    placeholder: "Describe your product, target audience, and campaign goal...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 1.5a2 2 0 0 1 2 2v1h1a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 13 14.5H3A1.5 1.5 0 0 1 1.5 13V6A1.5 1.5 0 0 1 3 4.5h1v-1a2 2 0 0 1 2-2h4z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
        <path d="M5 8.5h6M5 11h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "runway",
    label: "AI Video",
    desc: "Text to video — Runway or Pika",
    placeholder: "Describe the video you want to generate. Include setting, lighting, camera motion, and mood...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M6.5 6l4 2-4 2V6z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "img2vid",
    label: "Image → Video",
    desc: "Animate your product images",
    placeholder: "Upload an image and describe the motion. E.g. 'Slow pan left with subtle zoom, warm bokeh background'...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="2" width="6.5" height="6.5" rx="1.25" stroke="currentColor" strokeWidth="1.25"/>
        <rect x="8" y="7.5" width="6.5" height="6.5" rx="1.25" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M8 2.5h5.5M5 11.5l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "voice",
    label: "Voice Dubbing",
    desc: "AI voiceovers in 40+ languages",
    placeholder: "Paste your script here, or describe the voice style you want. Include tone, pace, and target language...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0V4A2.5 2.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M3.5 8.5a4.5 4.5 0 0 0 9 0M8 13v1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "sfx",
    label: "Sound Effects",
    desc: "Custom AI sound design",
    placeholder: "Describe the soundscape, music, or effects you need. Include mood, tempo, instruments, and duration...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8h2l2-4.5 2.5 9 2-6 1.5 3H14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "intel",
    label: "Competitor Intel",
    desc: "Analyze competitor ads with AI",
    placeholder: "Enter a competitor brand name, URL, or describe the market you want to analyze...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "logo",
    label: "Logo Generator",
    desc: "AI brand logos via Fal.ai",
    placeholder: "Describe any extra style direction...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L9.5 6h4.5l-3.6 2.6 1.4 4.4L8 10.5l-3.8 2.5 1.4-4.4L2 6h4.5L8 1.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      </svg>
    ),
    planBadge: "Growth+",
  },
  {
    id: "chat",
    label: "AI Chat",
    desc: "Brainstorm and ideate",
    placeholder: "Ask anything — campaign ideas, copywriting help, market research, creative direction...",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M5.5 9.5c.5 1 2.5 1.5 3 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="6" cy="7" r="0.75" fill="currentColor"/>
        <circle cx="10" cy="7" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
];

type Message = { role: "user" | "assistant"; content: string };

export default function DashboardPage() {
  const [activeTool, setActiveTool] = useState(tools[0]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [videoPlatform, setVideoPlatform] = useState<"runway" | "pika">("runway");
  const [logoStyle, setLogoStyle] = useState("Minimalist");
  const [logoColors, setLogoColors] = useState("");
  const [logoImages, setLogoImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setOutput(null);

    if (activeTool.id === "logo") {
      setLogoImages([]);
      try {
        const res = await fetch("/api/generate/logo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brandName: inputValue,
            style: logoStyle,
            colors: logoColors || undefined,
            additionalPrompt: undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Generation failed");
        setLogoImages((data.images as { url: string }[]).map((img) => img.url));
      } catch (err) {
        setOutput(`Error: ${err instanceof Error ? err.message : "Logo generation failed"}`);
      }
      setIsGenerating(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 1600));
    const platformLabel =
      activeTool.id === "runway"
        ? ` via ${videoPlatform === "runway" ? "Runway Gen-3" : "Pika 2.0"}`
        : "";
    setOutput(
      `Your ${activeTool.label.toLowerCase()}${platformLabel} result will appear here once the AI backend is connected. Input received: "${inputValue.slice(0, 80)}${inputValue.length > 80 ? "..." : ""}"`
    );
    setIsGenerating(false);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg: Message = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1400));
    const assistantMsg: Message = {
      role: "assistant",
      content:
        "I'm ready to help with your video ad strategy! This chat will connect to the AI backend once deployed. What would you like to explore?",
    };
    setChatMessages((prev) => [...prev, assistantMsg]);
    setIsGenerating(false);
  };

  const switchTool = (tool: typeof tools[0]) => {
    setActiveTool(tool);
    setInputValue("");
    setOutput(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#08080a",
        color: "#e2e2e2",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 52,
          background: "rgba(8,8,10,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 40,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              A
            </div>
            <span style={{ fontWeight: 600, color: "#fff", fontSize: 14, letterSpacing: "-0.02em" }}>
              addecay
            </span>
          </Link>

          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Studio</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                boxShadow: "0 0 6px rgba(74,222,128,0.6)",
              }}
            />
            All systems online
          </div>

          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            U
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>

        {/* Sidebar */}
        <aside
          style={{
            width: 212,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            padding: "16px 10px",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "rgba(255,255,255,0.18)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "0 10px",
              marginBottom: 8,
            }}
          >
            Tools
          </p>

          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {tools.map((tool) => {
              const active = activeTool.id === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => switchTool(tool)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: active ? "rgba(255,255,255,0.08)" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.38)",
                    fontSize: 13,
                    fontWeight: active ? 500 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    width: "100%",
                  }}
                >
                  <span style={{ color: active ? "#a78bfa" : "rgba(255,255,255,0.2)", flexShrink: 0 }}>
                    {tool.icon}
                  </span>
                  <span style={{ flex: 1 }}>{tool.label}</span>
                  {"planBadge" in tool && tool.planBadge && (
                    <span style={{ fontSize: 9, fontWeight: 600, color: "#a78bfa", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 4, padding: "1px 5px", letterSpacing: "0.04em" }}>
                      {tool.planBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Usage card */}
          <div style={{ marginTop: "auto", paddingTop: 16 }}>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 16,
              }}
            >
              <div
                className="glass"
                style={{ borderRadius: 12, padding: 14 }}
              >
                <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", margin: "0 0 6px" }}>
                  Monthly Usage
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>3</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>/ 5 ads</span>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.06)",
                    overflow: "hidden",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "60%",
                      borderRadius: 2,
                      background: "linear-gradient(to right, #8b5cf6, #d946ef)",
                    }}
                  />
                </div>
                <Link
                  href="/#pricing"
                  style={{
                    fontSize: 12,
                    color: "#a78bfa",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  Upgrade to Pro →
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Tool header */}
          <div
            style={{
              padding: "20px 32px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a78bfa",
                }}
              >
                {activeTool.icon}
              </div>
              <div>
                <h1 style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: 0 }}>
                  {activeTool.label}
                </h1>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", margin: 0 }}>
                  {activeTool.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Workspace */}
          <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>

              {activeTool.id === "logo" ? (
                /* Logo Generator interface */
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Style picker */}
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Logo style
                    </p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["Minimalist", "Bold", "Vintage", "Modern", "Playful", "Tech", "Luxury"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLogoStyle(s)}
                          style={{ padding: "6px 14px", borderRadius: 999, border: `1px solid ${logoStyle === s ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`, background: logoStyle === s ? "rgba(139,92,246,0.12)" : "transparent", color: logoStyle === s ? "#a78bfa" : "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand name + colors */}
                  <div className="glass" style={{ borderRadius: 16, overflow: "hidden" }}>
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Brand name (e.g. Addecay)"
                      style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}
                    />
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <input
                        value={logoColors}
                        onChange={(e) => setLogoColors(e.target.value)}
                        placeholder="Color palette (optional) — e.g. deep purple and white"
                        style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "12px 24px", fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "inherit" }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
                        Powered by Fal.ai · Recraft v3
                      </span>
                      <button
                        onClick={handleGenerate}
                        disabled={!inputValue.trim() || isGenerating}
                        className="btn-primary"
                        style={{ fontSize: 13, padding: "8px 18px" }}
                      >
                        {isGenerating ? (
                          <>
                            <span style={{ width: 12, height: 12, border: "1.5px solid rgba(0,0,0,0.25)", borderTopColor: "#000", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                            Generating...
                          </>
                        ) : (
                          <>
                            Generate Logo
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Logo image results */}
                  {logoImages.length > 0 && (
                    <div className="glass animate-fade-in" style={{ borderRadius: 16, padding: 24 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          Generated Logos
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                        {logoImages.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noreferrer" style={{ display: "block", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#fff" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`Logo option ${i + 1}`} style={{ width: "100%", height: 180, objectFit: "contain", display: "block" }} />
                          </a>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                        <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }} onClick={handleGenerate}>
                          Regenerate
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error output */}
                  {output && (
                    <p style={{ fontSize: 13, color: "#f87171", padding: "12px 16px", background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 10 }}>
                      {output}
                    </p>
                  )}

                  {/* Empty state */}
                  {!logoImages.length && !output && !isGenerating && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 0", gap: 12, textAlign: "center" }}>
                      <div style={{ color: "rgba(255,255,255,0.05)", transform: "scale(2.5)", lineHeight: 1 }}>{activeTool.icon}</div>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", maxWidth: 260, lineHeight: 1.6, marginTop: 16 }}>
                        Enter your brand name, pick a style, and generate logo options powered by Fal.ai.
                      </p>
                    </div>
                  )}
                </div>
              ) : activeTool.id === "chat" ? (
                /* Chat interface */
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div
                    style={{
                      minHeight: 360,
                      maxHeight: 480,
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      padding: "20px 24px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 16,
                    }}
                  >
                    {chatMessages.length === 0 ? (
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          padding: "40px 0",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ color: "rgba(255,255,255,0.06)", fontSize: 32 }}>
                          {activeTool.icon}
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", margin: 0 }}>
                          Ask anything about your video ad strategy
                        </p>
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                          }}
                        >
                          <div
                            style={{
                              maxWidth: "80%",
                              padding: "10px 14px",
                              borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                              background:
                                msg.role === "user"
                                  ? "rgba(139,92,246,0.2)"
                                  : "rgba(255,255,255,0.05)",
                              border: `1px solid ${msg.role === "user" ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.07)"}`,
                              fontSize: 13,
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.6,
                            }}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    {isGenerating && (
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: "12px 12px 12px 4px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            display: "flex",
                            gap: 4,
                            alignItems: "center",
                          }}
                        >
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.3)",
                                display: "inline-block",
                                animation: `pulse ${0.8 + i * 0.15}s ease-in-out infinite`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="glass"
                    style={{ borderRadius: 14, overflow: "hidden" }}
                  >
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleChatSend();
                        }
                      }}
                      placeholder={activeTool.placeholder}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "16px 20px",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.75)",
                        resize: "none",
                        height: 80,
                        fontFamily: "inherit",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "8px 12px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <button
                        onClick={handleChatSend}
                        disabled={!chatInput.trim() || isGenerating}
                        className="btn-primary"
                        style={{ fontSize: 13, padding: "8px 16px" }}
                      >
                        Send
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard tool interface */
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Video platform selector */}
                  {activeTool.id === "runway" && (
                    <div style={{ display: "flex", gap: 6 }}>
                      {(["runway", "pika"] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setVideoPlatform(p)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 16px",
                            borderRadius: 10,
                            border: `1px solid ${videoPlatform === p ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.07)"}`,
                            background: videoPlatform === p ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.02)",
                            color: videoPlatform === p ? "#a78bfa" : "rgba(255,255,255,0.35)",
                            fontSize: 13,
                            fontWeight: videoPlatform === p ? 500 : 400,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {p === "runway" ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                              <path d="M5.5 5.5l4 1.5-4 1.5V5.5z" fill="currentColor"/>
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" stroke="currentColor" strokeWidth="1.25"/>
                              <path d="M5 7l2-2 2 2-2 2-2-2z" fill="currentColor"/>
                            </svg>
                          )}
                          {p === "runway" ? "Runway Gen-3" : "Pika 2.0"}
                        </button>
                      ))}
                      <span style={{ alignSelf: "center", marginLeft: 4, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                        {videoPlatform === "runway"
                          ? "Cinematic motion · up to 10s"
                          : "Stylized & animated · fast generation"}
                      </span>
                    </div>
                  )}

                  <div
                    className="glass"
                    style={{ borderRadius: 16, overflow: "hidden" }}
                  >
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={
                        activeTool.id === "runway"
                          ? videoPlatform === "runway"
                            ? "Describe the video — setting, lighting, camera motion, and mood. Runway excels at cinematic, photorealistic shots..."
                            : "Describe the video — style, motion, and mood. Pika works great for stylized visuals, product animations, and fast iterations..."
                          : activeTool.placeholder
                      }
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "20px 24px",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.75)",
                        resize: "none",
                        height: 140,
                        fontFamily: "inherit",
                        lineHeight: 1.65,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
                        {inputValue.length} characters
                      </span>
                      <button
                        onClick={handleGenerate}
                        disabled={!inputValue.trim() || isGenerating}
                        className="btn-primary"
                        style={{ fontSize: 13, padding: "8px 18px" }}
                      >
                        {isGenerating ? (
                          <>
                            <span
                              style={{
                                width: 12,
                                height: 12,
                                border: "1.5px solid rgba(0,0,0,0.25)",
                                borderTopColor: "#000",
                                borderRadius: "50%",
                                display: "inline-block",
                                animation: "spin 0.7s linear infinite",
                              }}
                            />
                            Generating...
                          </>
                        ) : (
                          <>
                            {activeTool.id === "runway"
                              ? `Generate with ${videoPlatform === "runway" ? "Runway" : "Pika"}`
                              : "Generate"}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Output */}
                  {output && (
                    <div
                      className="glass animate-fade-in"
                      style={{ borderRadius: 16, padding: 24 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 16,
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                          }}
                        />
                        <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          Result
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 20px" }}>
                        {output}
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}>
                          Copy
                        </button>
                        <button
                          className="btn-secondary"
                          style={{ fontSize: 12, padding: "6px 14px" }}
                          onClick={handleGenerate}
                        >
                          Regenerate
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {!output && !isGenerating && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "64px 0",
                        gap: 12,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "rgba(255,255,255,0.05)", transform: "scale(2.5)", lineHeight: 1 }}>
                        {activeTool.icon}
                      </div>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", maxWidth: 280, lineHeight: 1.6, marginTop: 16 }}>
                        Enter a prompt above and click Generate to create with {activeTool.label.toLowerCase()}.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out both;
        }
        button:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
