import { NextRequest, NextResponse } from 'next/server';

const XI_BASE = 'https://api.elevenlabs.io/v1';

export async function POST(req: NextRequest) {
  try {
    const { prompt, durationSeconds = 10, promptInfluence = 0.3 } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
    }
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 503 });
    }

    const res = await fetch(`${XI_BASE}/sound-generation`, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: prompt,
        duration_seconds: durationSeconds,
        prompt_influence: promptInfluence,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('ElevenLabs SFX error:', err);
      return NextResponse.json({ error: 'Failed to generate sound effects' }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString('base64');
    return NextResponse.json({ audio: base64, contentType: 'audio/mpeg' });
  } catch (error) {
    console.error('SFX generation error:', error);
    return NextResponse.json({ error: 'Failed to generate sound effects' }, { status: 500 });
  }
}
