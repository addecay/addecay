import { NextRequest, NextResponse } from 'next/server';

const HEYGEN_BASE = 'https://api.heygen.com';

// Common HeyGen voice IDs — call GET /v2/voices to see the full list.
const VOICE_IDS: Record<string, string> = {
  jenny:   '1bd001e7e50f421d891986aad5158bc8',
  guy:     '2d5b0e6cf36f460aa7fc47e3eee4ba54',
  aria:    'en-US-AriaNeural',
  davis:   'en-US-DavisNeural',
  emma:    'en-US-EmmaNeural',
};

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'jenny', speed = 1.0 } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }
    if (!process.env.HEYGEN_API_KEY) {
      return NextResponse.json({ error: 'HeyGen API key not configured' }, { status: 503 });
    }

    const voiceId = VOICE_IDS[voice.toLowerCase()] ?? VOICE_IDS.jenny;

    const res = await fetch(`${HEYGEN_BASE}/v2/text_to_speech`, {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.HEYGEN_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({ voice_id: voiceId, text, speed }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('HeyGen TTS error:', err);
      return NextResponse.json({ error: 'Failed to generate voice' }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString('base64');
    return NextResponse.json({ audio: base64, contentType: 'audio/mpeg' });
  } catch (error) {
    console.error('Voice generation error:', error);
    return NextResponse.json({ error: 'Failed to generate voice' }, { status: 500 });
  }
}
