import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import TemplateEditor from '@/components/editor/TemplateEditor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const template = await prisma.template.findUnique({ where: { id } });
  return { title: template ? `${template.name} — MailCraft` : 'Template' };
}

export default async function EditTemplatePage({ params }: PageProps) {
  const { id } = await params;
  const template = await prisma.template.findUnique({ where: { id } });
  if (!template) notFound();

  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <TemplateEditor
        templateId={template.id}
        initialData={{
          name: template.name,
          subject: template.subject,
          category: template.category,
          description: template.description,
          code: template.code,
          variables: template.variables,
        }}
      />
    </div>
  );
}
