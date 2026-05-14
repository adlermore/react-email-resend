import TemplateEditor from '@/components/editor/TemplateEditor';

export const metadata = { title: 'New Template — MailCraft' };

export default function NewTemplatePage() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <TemplateEditor />
    </div>
  );
}
