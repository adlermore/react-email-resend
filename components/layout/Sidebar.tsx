'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Send, Settings, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/',                 label: 'Dashboard', icon: LayoutDashboard },
  { href: '/templates',        label: 'Templates',  icon: FileText },
  { href: '/react-playground', label: 'Playground', icon: FlaskConical },
  { href: '/send',             label: 'Send',       icon: Send },
  { href: '/settings',         label: 'Settings',   icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-52 shrink-0 bg-rail h-full">
      {/* Wordmark */}
      <div className="px-6 py-5 border-b border-white/[0.07]">
        <span className="font-display text-[11px] font-bold tracking-[0.25em] text-ink-inverse/80 uppercase select-none">
          MailCraft
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex items-center gap-3 mx-3 px-3 py-2.5 text-xs font-medium tracking-wide transition-colors',
                active
                  ? 'text-ink-inverse bg-white/8'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              )}
            >
              {active && (
                <span className="absolute left-0 inset-y-0 w-0.5 bg-brand" />
              )}
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{label}</span>
              {active && (
                <span className="ml-auto h-1 w-1 rounded-full bg-brand shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/[0.07]">
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
          v0.1
        </span>
      </div>
    </aside>
  );
}
