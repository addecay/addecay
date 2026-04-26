import { NextRequest, NextResponse } from 'next/server';

const RUNWAY_BASE = 'https://api.runwayml.com/v1';
const RUNWAY_HEADERS = () => ({
  Authorization: `Bearer ${process.env.RUNWAYML_API_SECRET}`,
  'X-Runway-Version': '2024-11-06',
  'Content-Type': 'application/json',
});

// POST /api/generate/video — start a generation job, return { taskId }
export async function POST(req: NextRequest) {
  try {
    const { prompt, imageUrl, duration = 5, ratio = '1280:768' } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
    }
    if (!process.env.RUNWAYML_API_SECRET) {
      return NextResponse.json({ error: 'Runway API key not configured' }, { status: 503 });
    }

    const body: Record<string, unknown> = {
      model: 'gen3a_turbo',
      promptText: prompt,
      duration,
      ratio,
    };
    if (imageUrl) body.promptImage = imageUrl;

    const res = await fetch(`${RUNWAY_BASE}/image_to_video`, {
      method: 'POST',
      headers: RUNWAY_HEADERS(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Runway create error:', err);
      return NextResponse.json({ error: 'Failed to start video generation' }, { status: res.status });
    }

    const data = (await res.json()) as { id: string };
    return NextResponse.json({ taskId: data.id });
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json({ error: 'Failed to generate video' }, { status: 500 });
  }
}

// GET /api/generate/video?taskId=xxx — poll task status
export async function GET(req: NextRequest) {
  try {
    const taskId = req.nextUrl.searchParams.get('taskId');
    if (!taskId) return NextResponse.json({ error: 'taskId is required' }, { status: 400 });
    if (!process.env.RUNWAYML_API_SECRET) {
      return NextResponse.json({ error: 'Runway API key not configured' }, { status: 503 });
    }

    const res = await fetch(`${RUNWAY_BASE}/tasks/${taskId}`, {
      headers: RUNWAY_HEADERS(),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch task status' }, { status: res.status });
    }

    const data = (await res.json()) as {
      id: string;
      status: 'PENDING' | 'THROTTLED' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
      output?: string[];
      failure?: string;
    };

    return NextResponse.json({
      status: data.status,
      videoUrl: data.output?.[0] ?? null,
      error: data.failure ?? null,
    });
  } catch (error) {
    console.error('Task poll error:', error);
    return NextResponse.json({ error: 'Failed to poll task' }, { status: 500 });
  }
}
