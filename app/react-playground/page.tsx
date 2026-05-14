import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ReactPlayground from '@/components/playground/ReactPlayground';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ReactPlaygroundPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  if (id) {
    const template = await prisma.template.findUnique({ where: { id } });
    if (!template) notFound();

    return (
      <Suspense>
        <ReactPlayground
          templateId={template.id}
          initialName={template.name}
          initialCode={template.code}
        />
      </Suspense>
    );
  }

  return (
    <Suspense>
      <ReactPlayground />
    </Suspense>
  );
}
