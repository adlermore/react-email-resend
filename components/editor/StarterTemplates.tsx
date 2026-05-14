'use client';

import {
  X, UserCheck, Newspaper, KeyRound, Package,
  CalendarDays, FileText, Code2,
} from 'lucide-react';

const starters = [
  {
    id: 'welcome',
    label: 'Welcome Email',
    description: 'Onboarding new users with a warm greeting',
    icon: UserCheck,
    accent: 'bg-[#6366F1]/10 text-[#6366F1]',
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    description: 'Content digest with multiple article sections',
    icon: Newspaper,
    accent: 'bg-ink/5 text-ink-muted',
  },
  {
    id: 'password-reset',
    label: 'Password Reset',
    description: 'Security-focused minimal reset email',
    icon: KeyRound,
    accent: 'bg-danger/10 text-danger',
  },
  {
    id: 'order-confirmation',
    label: 'Order Confirmation',
    description: 'E-commerce receipt with line items',
    icon: Package,
    accent: 'bg-success/10 text-success',
  },
  {
    id: 'event-invitation',
    label: 'Event Invitation',
    description: 'Date, time, location and RSVP button',
    icon: CalendarDays,
    accent: 'bg-brand/10 text-brand',
  },
  {
    id: 'blank',
    label: 'Blank Template',
    description: 'Minimal starter with header and footer',
    icon: FileText,
    accent: 'bg-rule text-ink-faint',
  },
  {
    id: 'custom',
    label: 'Build Custom',
    description: 'Start from scratch using React Email components',
    icon: Code2,
    accent: 'bg-ink text-ink-inverse',
    highlight: true,
  },
];

interface StarterTemplatesProps {
  onSelect: (templateId: string) => void;
  onClose: () => void;
}

export default function StarterTemplates({ onSelect, onClose }: StarterTemplatesProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-canvas border border-rule shadow-2xl p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="font-display text-xl font-bold text-ink leading-none">
              Start from a template
            </h2>
            <p className="text-xs text-ink-muted mt-1.5">
              Choose a pre-built template, or build custom with React Email components
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-ink-faint hover:text-ink transition-colors p-1"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {starters.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`group text-left overflow-hidden transition-colors border ${
                  s.highlight
                    ? 'bg-ink border-ink hover:bg-ink/85 col-span-2 sm:col-span-1'
                    : 'bg-card border-rule hover:border-ink/25'
                }`}
              >
                {/* Icon preview area */}
                <div className={`h-20 flex items-center justify-center ${s.accent}`}>
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <div className={`p-3 border-t ${s.highlight ? 'border-white/10' : 'border-rule'}`}>
                  <p className={`text-sm font-semibold font-display leading-tight ${
                    s.highlight ? 'text-ink-inverse' : 'text-ink'
                  }`}>
                    {s.label}
                  </p>
                  <p className={`text-[11px] mt-1 leading-snug ${
                    s.highlight ? 'text-ink-inverse/60' : 'text-ink-muted'
                  }`}>
                    {s.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
