import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPTS: Record<string, string> = {
  script: `You are an expert direct-response copywriter specialising in video ad scripts.
Write punchy, conversion-focused scripts with a clear hook (first 3 seconds), benefit-led body, and a strong CTA.
Format output as plain text with section labels: HOOK, BODY, CTA.
Keep scripts under 60 seconds (≈150 words) unless the user requests longer.`,

  intel: `You are a competitive intelligence analyst for digital advertising.
Given a brand name, URL, or market description, analyse:
1. Likely ad angles and messaging strategies
2. Target audience segments
3. Potential weaknesses to exploit
4. Recommended counter-positioning for the user's brand
Be concise and actionable. Use bullet points.`,

  chat: `You are an AI creative strategist for AdDecay, an AI-powered video ad studio.
Help users brainstorm campaign ideas, refine ad copy, understand their audience, and improve their creative strategy.
Be direct, creative, and practical. Keep responses concise unless depth is requested.`,
};

// Singleton client — shared across requests in the same serverless instance
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { tool, prompt, messages } = await req.json() as {
    tool: 'script' | 'intel' | 'chat';
    prompt?: string;
    messages?: { role: 'user' | 'assistant'; content: string }[];
  };

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI text generation not configured' }, { status: 503 });
  }

  const systemText = SYSTEM_PROMPTS[tool] ?? SYSTEM_PROMPTS.chat;

  const anthropicMessages: Anthropic.MessageParam[] = messages
    ? messages.map((m) => ({ role: m.role, content: m.content }))
    : [{ role: 'user', content: prompt ?? '' }];

  if (!anthropicMessages.length || !anthropicMessages.at(-1)?.content) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      // Prompt caching on the system block — stable per-tool text is an ideal cache prefix.
      // Cache hits save ~90% on input token cost for repeated calls on the same tool.
      system: [
        {
          type: 'text',
          text: systemText,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: anthropicMessages,
    });

    const text = response.content.find((b) => b.type === 'text')?.text ?? '';
    return NextResponse.json({ text });
  } catch (err) {
    console.error('Anthropic error:', err);
    return NextResponse.json({ error: 'Text generation failed' }, { status: 500 });
  }
}
