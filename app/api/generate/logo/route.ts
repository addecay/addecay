import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

export async function POST(req: NextRequest) {
  try {
    const { brandName, style, colors } = await req.json();

    if (!brandName?.trim()) {
      return NextResponse.json({ error: 'brandName is required' }, { status: 400 });
    }

    const prompt = [
      `Logo for brand "${brandName}".`,
      `Style: ${style ?? 'modern, minimalist'}.`,
      colors ? `Color palette: ${colors}.` : '',
      'Clean vector-style logo, professional branding.',
    ]
      .filter(Boolean)
      .join(' ');

    const result = await fal.subscribe('fal-ai/recraft-v3', {
      input: {
        prompt,
        image_size: 'square_hd',
        style: 'vector_illustration',
      },
      headers: { Authorization: `Key ${process.env.FAL_KEY}` },
    }) as unknown as { images: { url: string; width: number; height: number }[] };

    return NextResponse.json({ images: result.images ?? [] });
  } catch (error) {
    console.error('Fal.ai logo error:', error);
    return NextResponse.json({ error: 'Failed to generate logo' }, { status: 500 });
  }
}
