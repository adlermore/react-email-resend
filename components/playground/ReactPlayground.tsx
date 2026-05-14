'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Save, RefreshCw, AlertCircle, Play, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const DEFAULT_CODE = `import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailProps {
  firstName?: string;
  url?: string;
}

export const MyEmail = ({ firstName = 'there', url = 'https://example.com' }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Hello {firstName}!</Preview>
    <Body style={{ fontFamily: 'sans-serif', background: '#f4f4f5', margin: '0', padding: '0' }}>
      <Container style={{ maxWidth: '600px', margin: '40px auto', background: '#fff', padding: '40px', borderRadius: '8px' }}>
        <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px' }}>
          Hello, {firstName}!
        </Text>
        <Text style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7', margin: '0 0 24px' }}>
          Welcome to the React Email playground. Edit this code and see your changes live.
        </Text>
        <Section>
          <Button
            href={url}
            style={{
              background: '#111827',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Get Started
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

MyEmail.PreviewProps = {
  firstName: 'World',
  url: 'https://example.com',
} satisfies EmailProps;

export default MyEmail;
`;

interface ReactPlaygroundProps {
  templateId?: string;
  initialName?: string;
  initialCode?: string;
}

export default function ReactPlayground({ templateId, initialName, initialCode }: ReactPlaygroundProps) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [previewHtml, setPreviewHtml] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState(initialName || 'React Email Template');
  const [rendering, setRendering] = useState(false);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const renderPreview = useCallback(async (src: string) => {
    if (!src.trim()) return;
    setRendering(true);
    setError('');
    try {
      const res = await fetch('/api/react-email/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: src }),
      });
      const data = await res.json() as { html?: string; error?: string };
      if (data.error) {
        setError(data.error);
      } else {
        setPreviewHtml(data.html ?? '');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setRendering(false);
    }
  }, []);

  // Debounce preview refresh on code change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => renderPreview(code), 900);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, renderPreview]);

  // Initial render on mount
  useEffect(() => {
    renderPreview(initialCode || DEFAULT_CODE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    if (!name.trim()) { toast.error('Template name is required'); return; }
    setSaving(true);
    try {
      const url = templateId ? `/api/templates/${templateId}` : '/api/templates';
      const method = templateId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          subject: '',
          category: 'general',
          description: 'React Email (JSX) template',
          code,
          variables: '[]',
        }),
      });
      const data = await res.json() as { success: boolean; data?: { id: string }; error?: string };
      if (data.success) {
        toast.success('Template saved!');
        if (!templateId && data.data?.id) {
          router.replace(`/react-playground?id=${data.data.id}`);
        }
      } else {
        toast.error(data.error || 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 shrink-0">
        <span className="text-[10px] tracking-widest text-white/30 uppercase font-medium shrink-0">
          Playground
        </span>
        <div className="w-px h-4 bg-white/10 shrink-0" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-transparent text-sm font-medium text-white/80 placeholder-gray-600 outline-none min-w-0"
          placeholder="Template name…"
        />
        <button
          onClick={() => renderPreview(code)}
          disabled={rendering}
          title="Run preview"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          {rendering
            ? <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            : <Play className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand text-white rounded-md hover:bg-brand/90 disabled:opacity-50 transition-colors"
        >
          <Save className="h-3 w-3" />
          {saving ? 'Saving…' : 'Save template'}
        </button>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 min-h-0">
        {/* Editor pane */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/5">
          <div className="flex items-center px-3 py-1.5 border-b border-white/5 shrink-0">
            <span className="text-xs text-gray-500">TypeScript · React Email JSX</span>
            {rendering && (
              <RefreshCw className="h-3 w-3 text-gray-600 animate-spin ml-auto" />
            )}
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="typescript"
              value={code}
              onChange={(v) => setCode(v ?? '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'var(--font-jb-mono), "JetBrains Mono", "Fira Code", monospace',
                wordWrap: 'on',
                tabSize: 2,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                padding: { top: 12 },
              }}
            />
          </div>
        </div>

        {/* Preview pane */}
        <div className="w-1/2 min-w-0 flex flex-col">
          <div className="flex items-center px-4 py-1.5 border-b border-white/5 shrink-0">
            <span className="text-xs text-gray-500">Preview</span>
            {error && (
              <button
                onClick={() => setError('')}
                className="ml-auto flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
              >
                <X className="h-3 w-3" /> Clear error
              </button>
            )}
          </div>
          <div className="flex-1 min-h-0 overflow-hidden bg-[#f4f4f5]">
            {error ? (
              <div className="p-4 h-full overflow-auto">
                <div className="flex items-start gap-2 text-red-300 bg-red-950/50 border border-red-800/50 rounded-lg p-4">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-1">Render error</p>
                    <pre className="text-xs whitespace-pre-wrap text-red-200/80 font-mono leading-relaxed">{error}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-0"
                sandbox="allow-same-origin"
                title="Email Preview"
              />
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 border-t border-white/5 px-4 py-1.5 shrink-0">
        <span className="text-xs text-gray-600">{code.length} chars</span>
        {templateId && (
          <span className="text-xs text-gray-600">id: {templateId}</span>
        )}
        <span className="text-xs text-gray-500 ml-auto">
          {rendering ? 'Rendering…' : previewHtml ? 'Preview ready' : ''}
        </span>
      </div>
    </div>
  );
}
