import { NextResponse } from 'next/server';
import { substituteVariables } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { code, variables = {} } = await req.json();
    if (!code) {
      return NextResponse.json({ success: false, error: 'No code provided' }, { status: 400 });
    }

    const substituted = substituteVariables(code, variables);
    return NextResponse.json({ success: true, data: { html: substituted } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Preview failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
