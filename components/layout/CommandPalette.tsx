'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LayoutDashboard, FileText, Send, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const commands = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard, group: 'Navigation' },
  { label: 'Templates', href: '/templates', icon: FileText, group: 'Navigation' },
  { label: 'New Template', href: '/templates/new', icon: Plus, group: 'Actions' },
  { label: 'Send Email', href: '/send', icon: Send, group: 'Actions' },
  { label: 'Settings', href: '/settings', icon: Settings, group: 'Navigation' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((href: string) => {
    router.push(href);
    onClose();
    setQuery('');
  }, [router, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelectedIndex((i) => Math.max(i - 1, 0));
      if (e.key === 'Enter' && filtered[selectedIndex]) execute(filtered[selectedIndex].href);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selectedIndex, execute, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-gray-900 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-gray-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          />
        </div>
        <div className="max-h-72 overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500">No commands found</p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.href}
                onClick={() => execute(cmd.href)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition-colors',
                  i === selectedIndex ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-white/5'
                )}
              >
                <cmd.icon className="h-4 w-4 shrink-0" />
                <span>{cmd.label}</span>
                <span className={cn('ml-auto text-xs', i === selectedIndex ? 'text-indigo-200' : 'text-gray-600')}>
                  {cmd.group}
                </span>
              </button>
            ))
          )}
        </div>
        <div className="border-t border-white/10 px-4 py-2 text-xs text-gray-600 flex gap-3">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
