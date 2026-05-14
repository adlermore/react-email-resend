'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils';
import { MoreHorizontal, Edit, Copy, Trash, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  subject: string;
  category: string;
  description: string;
  sendCount: number;
  updatedAt: string;
}

interface TemplateCardProps {
  template: Template;
  onDeleted: (id: string) => void;
  onDuplicated: (template: Template) => void;
}

const categoryAccents: Record<string, string> = {
  general:       'bg-ink-faint',
  marketing:     'bg-brand',
  transactional: 'bg-success',
  newsletter:    'bg-[#6366F1]',
  security:      'bg-danger',
};

export default function TemplateCard({ template, onDeleted, onDuplicated }: TemplateCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${template.name}"?`)) return;
    setDeleting(true);
    const res = await fetch(`/api/templates/${template.id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Template deleted');
      onDeleted(template.id);
    } else {
      toast.error('Failed to delete template');
    }
    setDeleting(false);
    setMenuOpen(false);
  };

  const handleDuplicate = async () => {
    const res = await fetch(`/api/templates/${template.id}/duplicate`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      toast.success('Template duplicated');
      onDuplicated(data.data);
    } else {
      toast.error('Failed to duplicate');
    }
    setMenuOpen(false);
  };

  const accentBar = categoryAccents[template.category] ?? 'bg-ink-faint';

  return (
    <div className="group flex flex-col bg-card border border-rule hover:border-ink/20 transition-colors overflow-hidden">

      {/* Category accent bar */}
      <div className={`h-0.5 w-full shrink-0 ${accentBar}`} />

      {/* Card header: category label + overflow menu */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-3 border-b border-rule">
        <span className="font-mono text-[9px] tracking-[0.2em] text-ink-muted uppercase">
          {template.category}
        </span>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1 text-ink-faint hover:text-ink transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Template actions"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-6 z-20 w-40 bg-card border border-rule shadow-lg py-1">
                <Link
                  href={`/templates/${template.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Edit className="h-3 w-3" /> Edit
                </Link>
                <button
                  onClick={handleDuplicate}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
                >
                  <Copy className="h-3 w-3" /> Duplicate
                </button>
                <Link
                  href={`/send?templateId=${template.id}`}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Send className="h-3 w-3" /> Send
                </Link>
                <div className="my-1 border-t border-rule" />
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-danger hover:bg-danger/5 transition-colors disabled:opacity-50"
                >
                  <Trash className="h-3 w-3" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-4">
        <h3 className="font-display font-bold text-sm text-ink leading-tight truncate">
          {template.name}
        </h3>
        {template.subject && (
          <p className="text-xs text-ink-muted mt-1 truncate leading-relaxed">
            {template.subject}
          </p>
        )}
        <p className="mt-3 font-mono text-[9px] tracking-wide text-ink-faint">
          {template.sendCount > 0 ? `${template.sendCount} sent · ` : ''}
          {formatRelativeTime(template.updatedAt)}
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex border-t border-rule">
        <Link
          href={`/templates/${template.id}`}
          className="flex-1 py-2.5 text-center font-mono text-[9px] tracking-[0.18em] text-ink-muted hover:text-ink hover:bg-canvas transition-colors uppercase"
        >
          Edit
        </Link>
        <Link
          href={`/send?templateId=${template.id}`}
          className="flex-1 py-2.5 text-center font-mono text-[9px] tracking-[0.18em] text-brand hover:text-brand/70 hover:bg-brand/5 border-l border-rule transition-colors uppercase"
        >
          Send →
        </Link>
      </div>
    </div>
  );
}
