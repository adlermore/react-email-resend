import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const original = await prisma.template.findUnique({ where: { id } });
    if (!original) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    const { id: _id, createdAt, updatedAt, sendCount, ...rest } = original;
    const copy = await prisma.template.create({
      data: { ...rest, name: `${original.name} (Copy)`, sendCount: 0 },
    });
    return NextResponse.json({ success: true, data: copy }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to duplicate template' }, { status: 500 });
  }
}
