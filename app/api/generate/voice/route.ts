import { NextRequest, NextResponse } from 'next/server';

const XI_BASE = 'https://api.elevenlabs.io/v1';

// Default voices available on all ElevenLabs plans
const VOICE_IDS: Record<string, string> = {
  rachel:  '21m00Tcm4TlvDq8ikWAM',
  domi:    'AZnzlk1XvdvUeBnXmlld',
  bella:   'EXAVITQu4vr4xnSDxMaL',
  adam:    'pNInz6obpgDQGcFmaJgB',
  sam:     'yoZ06aMxZJJ28mfd3POQ',
};

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'rachel', stability = 0.5, similarity = 0.75 } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 503 });
    }

    const voiceId = VOICE_IDS[voice.toLowerCase()] ?? VOICE_IDS.rachel;

    const res = await fetch(`${XI_BASE}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: { stability, similarity_boost: similarity },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('ElevenLabs TTS error:', err);
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
