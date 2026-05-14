'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Mail, LayoutGrid, List, Loader2 } from 'lucide-react';
import TemplateCard from '@/components/templates/TemplateCard';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  subject: string;
  category: string;
  description: string;
  sendCount: number;
  updatedAt: string;
}

const categories = ['all', 'general', 'marketing', 'transactional', 'newsletter', 'security'];

export default function Dashboard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setTemplates(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalSent = templates.reduce((sum, t) => sum + t.sendCount, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Page heading */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink leading-none">
            Templates
          </h1>
          <p className="mt-2 text-xs text-ink-muted font-mono tracking-wide">
            {templates.length} template{templates.length !== 1 ? 's' : ''}
            {totalSent > 0 && <> · {totalSent} sent</>}
          </p>
        </div>
        <Link
          href="/templates/new"
          className="flex items-center gap-2 bg-ink text-ink-inverse px-4 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-ink/80 transition-colors"
        >
          <Plus className="h-3 w-3" />
          New Template
        </Link>
      </div>

      {/* Filter strip */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-rule">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-faint pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates…"
            className="w-full border border-rule bg-card pl-9 pr-4 py-2 text-sm text-ink placeholder-ink-faint outline-none focus:border-ink/30 transition-colors"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors',
                category === c
                  ? 'bg-ink text-ink-inverse'
                  : 'border border-rule text-ink-muted hover:text-ink hover:border-ink/30'
              )}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>

        <div className="ml-auto flex border border-rule overflow-hidden shrink-0">
          <button
            onClick={() => setView('grid')}
            title="Grid view"
            className={cn(
              'p-2 transition-colors',
              view === 'grid' ? 'bg-ink text-ink-inverse' : 'bg-card text-ink-muted hover:text-ink'
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setView('list')}
            title="List view"
            className={cn(
              'p-2 border-l border-rule transition-colors',
              view === 'list' ? 'bg-ink text-ink-inverse' : 'bg-card text-ink-muted hover:text-ink'
            )}
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-5 w-5 text-ink-faint animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center border border-rule mb-5">
            <Mail className="h-6 w-6 text-ink-faint" />
          </div>
          {templates.length === 0 ? (
            <>
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                No templates yet
              </h3>
              <p className="text-sm text-ink-muted mb-6 max-w-xs leading-relaxed">
                Create your first email template. Choose a starter or build from scratch.
              </p>
              <Link
                href="/templates/new"
                className="flex items-center gap-2 bg-ink text-ink-inverse px-4 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-ink/80 transition-colors"
              >
                <Plus className="h-3 w-3" />
                Create Template
              </Link>
            </>
          ) : (
            <>
              <h3 className="font-display text-base font-bold text-ink mb-1">
                No results
              </h3>
              <p className="text-sm text-ink-muted">
                Adjust your search or filter.
              </p>
            </>
          )}
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onDeleted={(id) => setTemplates((prev) => prev.filter((x) => x.id !== id))}
              onDuplicated={(copy) => setTemplates((prev) => [copy as Template, ...prev])}
            />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-rule border-t border-rule">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 py-3.5 px-1 hover:bg-card transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{t.name}</p>
                {t.subject && (
                  <p className="text-xs text-ink-muted truncate mt-0.5">{t.subject}</p>
                )}
              </div>
              <span className="text-xs text-ink-faint font-mono hidden sm:block shrink-0">
                {t.sendCount} sent
              </span>
              <Link
                href={`/templates/${t.id}`}
                className="text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-muted hover:text-ink transition-colors shrink-0"
              >
                Edit
              </Link>
              <Link
                href={`/send?templateId=${t.id}`}
                className="text-[10px] font-semibold tracking-[0.12em] uppercase text-brand hover:text-brand/70 transition-colors shrink-0"
              >
                Send →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
