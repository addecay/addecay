"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
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

type CsvRow = {
  id: string;
  product: string;
  description: string;
  audience: string;
  status: "pending" | "generating" | "done" | "error";
  taskId?: string;
  videoUrl?: string;
};

function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
  return lines.slice(1).map((line, i) => {
    // simple CSV split — handles basic quoted commas
    const values: string[] = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { values.push(cur.trim()); cur = ""; }
      else cur += ch;
    }
    values.push(cur.trim());
    const cell = (keys: string[]) => {
      for (const k of keys) {
        const idx = headers.indexOf(k);
        if (idx !== -1 && values[idx]) return values[idx].replace(/^"|"$/g, "");
      }
      return "";
    };
    return {
      id: `row-${i}`,
      product: cell(["product", "name", "product name", "title"]) || `Product ${i + 1}`,
      description: cell(["description", "desc", "ad", "copy", "script"]),
      audience: cell(["audience", "target audience", "target"]),
      status: "pending" as const,
    };
  }).filter((r) => r.product);
}

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

  // Session
  const { data: session } = useSession();
  const userPlan = (session?.user as { plan?: string } | undefined)?.plan ?? "free";
  const userInitial = session?.user?.name?.[0] ?? session?.user?.email?.[0] ?? "U";

  // Standalone video tool state
  const [videoTaskId, setVideoTaskId] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<"idle" | "polling" | "done" | "error">("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Standalone voice tool state
  const [voiceAudioSrc, setVoiceAudioSrc] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState("jenny");

  // Standalone SFX tool state
  const [sfxAudioSrc, setSfxAudioSrc] = useState<string | null>(null);

  // CSV bulk generation
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);
  const [csvExpanded, setCsvExpanded] = useState(false);
  const [csvDragging, setCsvDragging] = useState(false);
  const [bulkRunning, setBulkRunning] = useState(false);

  // Poll generating bulk rows every 4 s
  useEffect(() => {
    const generatingRows = csvRows.filter((r) => r.status === "generating" && r.taskId);
    if (generatingRows.length === 0) return;
    const interval = setInterval(async () => {
      await Promise.all(
        generatingRows.map(async (row) => {
          try {
            const res = await fetch(`/api/generate/video?taskId=${row.taskId}`);
            const data = await res.json();
            if (data.status === "SUCCEEDED") {
              setCsvRows((prev) =>
                prev.map((r) => r.id === row.id ? { ...r, status: "done", videoUrl: data.videoUrl ?? undefined } : r)
              );
            } else if (data.status === "FAILED") {
              setCsvRows((prev) =>
                prev.map((r) => r.id === row.id ? { ...r, status: "error" } : r)
              );
            }
          } catch { /* keep polling */ }
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [csvRows]);

  // Poll standalone video tool
  useEffect(() => {
    if (!videoTaskId || videoStatus !== "polling") return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/generate/video?taskId=${videoTaskId}`);
        const data = await res.json();
        if (data.status === "SUCCEEDED") {
          setVideoUrl(data.videoUrl ?? null);
          setVideoStatus("done");
          setIsGenerating(false);
        } else if (data.status === "FAILED") {
          setOutput("Video generation failed. Please try a different prompt.");
          setVideoStatus("error");
          setIsGenerating(false);
        }
      } catch { /* keep polling */ }
    }, 4000);
    return () => clearInterval(interval);
  }, [videoTaskId, videoStatus]);

  function handleCsvFile(file: File) {
    if (!file.name.endsWith(".csv")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = parseCsv(e.target?.result as string);
      if (rows.length) { setCsvRows(rows); setCsvExpanded(true); }
    };
    reader.readAsText(file);
  }

  async function handleBulkGenerate() {
    setBulkRunning(true);
    const pending = csvRows.filter((r) => r.status === "pending");
    for (const row of pending) {
      setCsvRows((prev) => prev.map((r) => r.id === row.id ? { ...r, status: "generating" } : r));
      try {
        const prompt = [row.product, row.description, row.audience ? `Target: ${row.audience}` : ""]
          .filter(Boolean).join(". ");
        const res = await fetch("/api/generate/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        if (data.taskId) {
          setCsvRows((prev) => prev.map((r) => r.id === row.id ? { ...r, taskId: data.taskId } : r));
        } else {
          setCsvRows((prev) => prev.map((r) => r.id === row.id ? { ...r, status: "error" } : r));
        }
      } catch {
        setCsvRows((prev) => prev.map((r) => r.id === row.id ? { ...r, status: "error" } : r));
      }
      // slight stagger to avoid rate limits
      await new Promise((res) => setTimeout(res, 600));
    }
    setBulkRunning(false);
  }

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setOutput(null);

    // Logo — Fal.ai
    if (activeTool.id === "logo") {
      setLogoImages([]);
      try {
        const res = await fetch("/api/generate/logo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brandName: inputValue, style: logoStyle, colors: logoColors || undefined }),
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

    // AI Video — Runway Gen-3 (fire and poll)
    if (activeTool.id === "runway") {
      try {
        setVideoTaskId(null);
        setVideoUrl(null);
        setVideoStatus("polling");
        const res = await fetch("/api/generate/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: inputValue }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to start video generation");
        setVideoTaskId(data.taskId);
        // isGenerating stays true — cleared by polling effect
      } catch (err) {
        setOutput(`Error: ${err instanceof Error ? err.message : "Video generation failed"}`);
        setVideoStatus("error");
        setIsGenerating(false);
      }
      return;
    }

    // Voice Dubbing — HeyGen
    if (activeTool.id === "voice") {
      try {
        const res = await fetch("/api/generate/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputValue, voice: selectedVoice }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Voice generation failed");
        setVoiceAudioSrc(`data:${data.contentType};base64,${data.audio}`);
      } catch (err) {
        setOutput(`Error: ${err instanceof Error ? err.message : "Voice generation failed"}`);
      }
      setIsGenerating(false);
      return;
    }

    // Sound Effects — ElevenLabs
    if (activeTool.id === "sfx") {
      try {
        const res = await fetch("/api/generate/sfx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: inputValue }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "SFX generation failed");
        setSfxAudioSrc(`data:${data.contentType};base64,${data.audio}`);
      } catch (err) {
        setOutput(`Error: ${err instanceof Error ? err.message : "SFX generation failed"}`);
      }
      setIsGenerating(false);
      return;
    }

    // Mocked tools (script, img2vid, intel, chat)
    await new Promise((r) => setTimeout(r, 1200));
    setOutput(
      `Your ${activeTool.label.toLowerCase()} result will appear here once the AI backend is connected. Input: "${inputValue.slice(0, 80)}${inputValue.length > 80 ? "…" : ""}"`
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
    setVideoTaskId(null);
    setVideoUrl(null);
    setVideoStatus("idle");
    setVoiceAudioSrc(null);
    setSfxAudioSrc(null);
    setLogoImages([]);
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

          {userPlan !== "free" && (
            <span style={{ fontSize: 10, fontWeight: 600, color: "#a78bfa", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 999, padding: "3px 9px", letterSpacing: "0.06em", textTransform: "capitalize" as const }}>
              {userPlan}
            </span>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            title="Sign out"
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
              border: "none",
            }}
          >
            {userInitial.toUpperCase()}
          </button>
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
                  onClick={() => {
                    if ("planBadge" in tool && tool.planBadge && userPlan === "free") return;
                    switchTool(tool);
                  }}
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
          {/* ── CSV Bulk Upload ── */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            {csvRows.length === 0 ? (
              /* Compact upload bar */
              <div
                onDragOver={(e) => { e.preventDefault(); setCsvDragging(true); }}
                onDragLeave={() => setCsvDragging(false)}
                onDrop={(e) => {
                  e.preventDefault(); setCsvDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleCsvFile(file);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 32px",
                  background: csvDragging ? "rgba(139,92,246,0.06)" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv"
                  style={{ display: "none" }}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCsvFile(f); }}
                />
                <button
                  onClick={() => csvInputRef.current?.click()}
                  className="btn-secondary"
                  style={{ fontSize: 12, padding: "6px 14px", gap: 6 }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1v8M3 5l3.5-4 3.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 10.5h11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                  Upload CSV
                </button>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                  Bulk-generate video ads from a spreadsheet — one row per product
                </span>
                <a
                  href="data:text/csv;charset=utf-8,product,description,audience%0AExample%20Product,A%2060-second%20ad%20showcasing%20the%20product,Young%20professionals%2025-34"
                  download="bulk-ads-template.csv"
                  style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
                >
                  Download template ↓
                </a>
              </div>
            ) : (
              /* Expanded CSV table */
              <div style={{ padding: "0 32px" }}>
                {/* Table header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    onClick={() => setCsvExpanded((v) => !v)}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 6, padding: 0 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: csvExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 3h8M2 6h8M2 9h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    </svg>
                    Bulk generation — {csvRows.length} product{csvRows.length !== 1 ? "s" : ""}
                  </button>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                    {csvRows.filter((r) => r.status === "done").length} done ·{" "}
                    {csvRows.filter((r) => r.status === "generating").length} generating ·{" "}
                    {csvRows.filter((r) => r.status === "pending").length} pending
                  </span>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button
                      onClick={() => { setCsvRows([]); setCsvExpanded(false); if (csvInputRef.current) csvInputRef.current.value = ""; }}
                      style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 11, padding: "4px 8px" }}
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleBulkGenerate}
                      disabled={bulkRunning || csvRows.every((r) => r.status !== "pending")}
                      className="btn-primary"
                      style={{ fontSize: 12, padding: "6px 14px" }}
                    >
                      {bulkRunning ? (
                        <>
                          <span style={{ width: 10, height: 10, border: "1.5px solid rgba(0,0,0,0.25)", borderTopColor: "#000", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                          Generating…
                        </>
                      ) : "Generate All"}
                    </button>
                  </div>
                </div>

                {/* Rows */}
                {csvExpanded && (
                  <div style={{ maxHeight: 240, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr style={{ color: "rgba(255,255,255,0.25)", textAlign: "left" }}>
                          {["Product", "Description", "Audience", "Status"].map((h) => (
                            <th key={h} style={{ padding: "8px 10px 8px 0", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvRows.map((row) => (
                          <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <td style={{ padding: "8px 10px 8px 0", color: "rgba(255,255,255,0.7)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.product}</td>
                            <td style={{ padding: "8px 10px 8px 0", color: "rgba(255,255,255,0.4)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.description || "—"}</td>
                            <td style={{ padding: "8px 10px 8px 0", color: "rgba(255,255,255,0.4)", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.audience || "—"}</td>
                            <td style={{ padding: "8px 0" }}>
                              {row.status === "done" && row.videoUrl ? (
                                <a href={row.videoUrl} target="_blank" rel="noreferrer" style={{ color: "#4ade80", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                                  View video
                                </a>
                              ) : row.status === "done" ? (
                                <span style={{ color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
                                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} /> Done
                                </span>
                              ) : row.status === "generating" ? (
                                <span style={{ color: "#a78bfa", display: "flex", alignItems: "center", gap: 4 }}>
                                  <span style={{ width: 10, height: 10, border: "1.5px solid rgba(167,139,250,0.3)", borderTopColor: "#a78bfa", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                                  Generating
                                </span>
                              ) : row.status === "error" ? (
                                <span style={{ color: "#f87171", display: "flex", alignItems: "center", gap: 4 }}>
                                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171", display: "inline-block" }} /> Error
                                </span>
                              ) : (
                                <span style={{ color: "rgba(255,255,255,0.2)" }}>Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

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

                  {/* Voice selector */}
                  {activeTool.id === "voice" && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {(["jenny", "guy", "aria", "davis", "emma"] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVoice(v)}
                          style={{ padding: "6px 14px", borderRadius: 999, border: `1px solid ${selectedVoice === v ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`, background: selectedVoice === v ? "rgba(139,92,246,0.12)" : "transparent", color: selectedVoice === v ? "#a78bfa" : "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", textTransform: "capitalize" as const }}
                        >
                          {v}
                        </button>
                      ))}
                      <span style={{ alignSelf: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 4 }}>Powered by HeyGen</span>
                    </div>
                  )}

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

                  {/* Video result */}
                  {activeTool.id === "runway" && videoStatus === "polling" && isGenerating && (
                    <div className="glass animate-fade-in" style={{ borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(139,92,246,0.3)", borderTopColor: "#a78bfa", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Runway is generating your video — this takes 30–90 seconds…</span>
                    </div>
                  )}
                  {activeTool.id === "runway" && videoStatus === "done" && videoUrl && (
                    <div className="glass animate-fade-in" style={{ borderRadius: 16, overflow: "hidden" }}>
                      <video src={videoUrl} controls style={{ width: "100%", display: "block", maxHeight: 360 }} />
                      <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                        <a href={videoUrl} download className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}>Download</a>
                        <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }} onClick={handleGenerate}>Regenerate</button>
                      </div>
                    </div>
                  )}

                  {/* Voice audio player */}
                  {activeTool.id === "voice" && voiceAudioSrc && (
                    <div className="glass animate-fade-in" style={{ borderRadius: 16, padding: 20 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Voice output</p>
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <audio src={voiceAudioSrc} controls style={{ width: "100%", accentColor: "#a78bfa" }} />
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <a href={voiceAudioSrc} download="voice.mp3" className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}>Download</a>
                        <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }} onClick={handleGenerate}>Regenerate</button>
                      </div>
                    </div>
                  )}

                  {/* SFX audio player */}
                  {activeTool.id === "sfx" && sfxAudioSrc && (
                    <div className="glass animate-fade-in" style={{ borderRadius: 16, padding: 20 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sound output</p>
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <audio src={sfxAudioSrc} controls style={{ width: "100%", accentColor: "#a78bfa" }} />
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <a href={sfxAudioSrc} download="sfx.mp3" className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}>Download</a>
                        <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }} onClick={handleGenerate}>Regenerate</button>
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {!output && !isGenerating && !videoUrl && !voiceAudioSrc && !sfxAudioSrc && videoStatus !== "polling" && (
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
