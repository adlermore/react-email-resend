'use client';

import { cn } from '@/lib/utils';

interface PreviewPaneProps {
  html: string;
  device: 'desktop' | 'mobile';
  darkMode: boolean;
}

export default function PreviewPane({ html, device, darkMode }: PreviewPaneProps) {
  const width = device === 'mobile' ? '375px' : '600px';

  const wrappedHtml = darkMode
    ? `<html style="background:#1a1a1a;"><body style="background:#1a1a1a;margin:0;">${html}</body></html>`
    : `<html><body style="background:#f4f4f5;margin:0;">${html}</body></html>`;

  return (
    <div className={cn('flex flex-col h-full', darkMode ? 'bg-gray-900' : 'bg-gray-100')}>
      <div className="flex items-center justify-center gap-2 py-2 px-4 border-b border-white/10 shrink-0">
        <span className="text-xs text-gray-500">Preview</span>
        <span className="text-xs text-gray-600">—</span>
        <span className="text-xs text-gray-500">{device === 'mobile' ? '375px' : '600px'} width</span>
        {darkMode && <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">dark</span>}
      </div>
      <div className="flex-1 overflow-auto flex justify-center p-4">
        <div className="shrink-0 transition-all duration-300" style={{ width }}>
          {html ? (
            <iframe
              srcDoc={wrappedHtml}
              className="w-full border-0 rounded shadow-lg"
              style={{ minHeight: '500px', height: 'calc(100vh - 120px)' }}
              title="Email preview"
              sandbox="allow-same-origin"
            />
          ) : (
            <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-gray-600">
              <p className="text-sm text-gray-500">Start typing to see a preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
