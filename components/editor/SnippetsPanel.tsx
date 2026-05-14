'use client';

import { X } from 'lucide-react';

const snippets = [
  {
    label: 'Header',
    code: `<table width="100%" style="background:#4f46e5;padding:24px 32px;">
  <tr><td style="color:#fff;font-size:20px;font-weight:bold;">Company Name</td></tr>
</table>`,
  },
  {
    label: 'Hero Section',
    code: `<table width="100%" style="padding:40px 32px;background:#fff;text-align:center;">
  <tr><td style="font-size:28px;font-weight:800;color:#111;">Your Headline Here</td></tr>
  <tr><td style="font-size:16px;color:#666;padding-top:12px;">Supporting text that describes the value proposition.</td></tr>
</table>`,
  },
  {
    label: 'CTA Button',
    code: `<table width="100%" style="padding:24px 32px;text-align:center;">
  <tr><td><a href="https://example.com" style="background:#4f46e5;color:#fff;padding:12px 28px;border-radius:6px;font-weight:600;text-decoration:none;display:inline-block;">Get Started →</a></td></tr>
</table>`,
  },
  {
    label: 'Two Columns',
    code: `<table width="100%" style="padding:24px 32px;">
  <tr>
    <td width="50%" style="padding-right:12px;vertical-align:top;font-size:14px;color:#374151;">
      <strong>Column One</strong><br/>Content for the first column goes here.
    </td>
    <td width="50%" style="padding-left:12px;vertical-align:top;font-size:14px;color:#374151;">
      <strong>Column Two</strong><br/>Content for the second column goes here.
    </td>
  </tr>
</table>`,
  },
  {
    label: 'Divider',
    code: `<table width="100%" style="padding:0 32px;">
  <tr><td style="border-top:1px solid #e5e7eb;height:1px;">&nbsp;</td></tr>
</table>`,
  },
  {
    label: 'Footer',
    code: `<table width="100%" style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
  <tr><td style="text-align:center;font-size:12px;color:#9ca3af;">
    © 2026 Company. All rights reserved.<br/>
    <a href="#" style="color:#9ca3af;">Unsubscribe</a> · <a href="#" style="color:#9ca3af;">Privacy Policy</a>
  </td></tr>
</table>`,
  },
];

interface SnippetsPanelProps {
  onInsert: (code: string) => void;
  onClose: () => void;
}

export default function SnippetsPanel({ onInsert, onClose }: SnippetsPanelProps) {
  return (
    <div className="w-64 border-l border-white/10 bg-gray-900 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm font-semibold text-white">Snippets</span>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {snippets.map((s) => (
          <button
            key={s.label}
            onClick={() => onInsert(s.code)}
            className="w-full text-left rounded-lg border border-white/10 bg-gray-800 px-3 py-2.5 hover:border-indigo-500/50 hover:bg-gray-750 transition-colors"
          >
            <span className="text-sm font-medium text-white">{s.label}</span>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 font-mono">{s.code.trim().substring(0, 60)}...</p>
          </button>
        ))}
      </div>
    </div>
  );
}
