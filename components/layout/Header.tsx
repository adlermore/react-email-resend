'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const breadcrumbMap: Record<string, string> = {
  '/':              'Dashboard',
  '/templates':     'Templates',
  '/templates/new': 'New Template',
  '/send':          'Send Email',
  '/settings':      'Settings',
};

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: Array<{ label: string; href: string }> = [{ label: 'Home', href: '/' }];
  let current = '';
  for (const part of parts) {
    current += `/${part}`;
    const label =
      breadcrumbMap[current] || (part === 'new' ? 'New Template' : 'Edit Template');
    crumbs.push({ label, href: current });
  }
  return crumbs;
}

interface HeaderProps {
  onCommandPalette?: () => void;
}

export default function Header({ onCommandPalette }: HeaderProps) {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className="flex h-12 items-center justify-between border-b border-rule bg-canvas px-6 shrink-0">
      <nav className="flex items-center gap-1 text-xs text-ink-muted">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 text-ink-faint" />}
            {i === crumbs.length - 1 ? (
              <span className="text-ink font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-ink transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <button
        onClick={onCommandPalette}
        className="flex items-center gap-1.5 border border-rule px-2.5 py-1 font-mono text-[10px] tracking-widest text-ink-muted hover:text-ink hover:border-ink/20 transition-colors"
      >
        <span>⌘K</span>
      </button>
    </header>
  );
}
