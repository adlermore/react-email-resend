'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Braces, Puzzle, Layers } from 'lucide-react';
import dynamic from 'next/dynamic';
import EditorToolbar from './EditorToolbar';
import PreviewPane from './PreviewPane';
import VariablesPanel from './VariablesPanel';
import SnippetsPanel from './SnippetsPanel';
import ReactEmailPanel from './ReactEmailPanel';
import StarterTemplates from './StarterTemplates';
import { extractVariables, substituteVariables } from '@/lib/utils';

const CodeEditor = dynamic(() => import('./CodeEditor'), { ssr: false });

interface TemplateEditorProps {
  templateId?: string;
  initialData?: {
    name: string;
    subject: string;
    category: string;
    description: string;
    code: string;
    variables: string;
  };
}

const STARTER_CODES: Record<string, string> = {
  custom: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Email</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,sans-serif;">
  <!-- Preview text (shown in inbox before opening) -->
  <div style="display:none;max-height:0;overflow:hidden;">{{previewText}}</div>

  <!-- Outer table -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Email container (600px max-width) -->
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;">

          <!-- Header -->
          <tr>
            <td style="background:#0D0D0D;padding:24px 40px;">
              <span style="font-size:18px;font-weight:800;color:#F2F0EA;
                letter-spacing:0.15em;text-transform:uppercase;">
                {{companyName}}
              </span>
            </td>
          </tr>

          <!-- Main content — add your blocks here -->
          <tr>
            <td style="padding:40px;">
              <h1 style="font-size:28px;font-weight:800;color:#111827;
                margin:0 0 16px;line-height:1.2;">
                {{heading}}
              </h1>
              <p style="font-size:15px;line-height:1.7;color:#374151;margin:0 0 24px;">
                {{body}}
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#D4380D;border-radius:4px;">
                    <a href="{{ctaUrl}}"
                      style="display:inline-block;padding:12px 28px;
                        font-size:14px;font-weight:600;color:#ffffff;
                        text-decoration:none;letter-spacing:0.04em;">
                      {{ctaLabel}} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #E2E0DA;padding:20px 40px;
              text-align:center;font-size:12px;color:#9ca3af;">
              © 2026 {{companyName}}. All rights reserved. ·
              <a href="{{unsubscribeUrl}}"
                style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  blank: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="background:#f4f4f5;margin:0;padding:40px 0;font-family:system-ui,sans-serif;">
<table width="600" align="center" style="background:#fff;border-radius:8px;overflow:hidden;">
  <tr><td style="background:#111827;padding:24px 32px;color:#fff;font-size:20px;font-weight:700;">{{companyName}}</td></tr>
  <tr><td style="padding:40px;">
    <h2 style="font-size:22px;color:#111;margin:0 0 16px;">{{title}}</h2>
    <p style="font-size:15px;line-height:1.7;color:#374151;margin:0;">{{content}}</p>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;font-size:12px;color:#9ca3af;">© 2026 {{companyName}}</td></tr>
</table>
</body></html>`,
};

async function loadStarterCode(id: string): Promise<string> {
  if (STARTER_CODES[id]) return STARTER_CODES[id];
  try {
    const res = await fetch(`/api/starter-templates/${id}`);
    const data = await res.json();
    return data.html || '';
  } catch {
    return STARTER_CODES.blank;
  }
}

export default function TemplateEditor({ templateId, initialData }: TemplateEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || 'Untitled Template');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [category, setCategory] = useState(initialData?.category || 'general');
  const [description, setDescription] = useState(initialData?.description || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<'code' | 'visual'>('code');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [darkPreview, setDarkPreview] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showReactEmail, setShowReactEmail] = useState(false);
  const [showStarters, setShowStarters] = useState(!templateId && !initialData?.code);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  const previewHtml = substituteVariables(code, variables);

  const closeSidePanels = (except?: 'variables' | 'snippets' | 'reactemail') => {
    if (except !== 'variables') setShowVariables(false);
    if (except !== 'snippets') setShowSnippets(false);
    if (except !== 'reactemail') setShowReactEmail(false);
  };

  const save = useCallback(async (silent = false) => {
    if (!name.trim()) { toast.error('Template name is required'); return; }
    setSaving(true);
    const payload = {
      name: name.trim(),
      subject,
      category,
      description,
      code,
      variables: JSON.stringify(extractVariables(code)),
    };
    try {
      const url = templateId ? `/api/templates/${templateId}` : '/api/templates';
      const method = templateId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        if (!silent) toast.success('Template saved!');
        setAutoSaveStatus(`Saved ${new Date().toLocaleTimeString()}`);
        if (!templateId && data.data?.id) {
          router.replace(`/templates/${data.data.id}`);
        }
      } else {
        toast.error(data.error || 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  }, [name, subject, category, description, code, templateId, router]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    if (!code) return;
    setAutoSaveStatus('Unsaved changes');
    autoSaveTimer.current = setTimeout(() => save(true), 30000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [code, name, subject, category]);

  const handleSnippetInsert = (snippet: string) => {
    setCode((prev) => prev + '\n' + snippet);
    setShowSnippets(false);
  };

  const handleComponentInsert = (snippet: string) => {
    setCode((prev) => {
      const trimmed = prev.trimEnd();
      // Insert before closing </body> if present, otherwise append
      const bodyClose = trimmed.lastIndexOf('</body>');
      if (bodyClose !== -1) {
        return (
          trimmed.slice(0, bodyClose) +
          '\n\n' + snippet + '\n\n' +
          trimmed.slice(bodyClose)
        );
      }
      return trimmed + '\n\n' + snippet;
    });
    toast.success('Component inserted');
  };

  const handleStarterSelect = async (starterId: string) => {
    const starterCode = await loadStarterCode(starterId);
    setCode(starterCode);
    setShowStarters(false);

    const nameMap: Record<string, string> = {
      welcome: 'Welcome Email',
      newsletter: 'Newsletter',
      'password-reset': 'Password Reset',
      'order-confirmation': 'Order Confirmation',
      'event-invitation': 'Event Invitation',
      blank: 'Blank Template',
      custom: 'Custom Template',
    };
    setName(nameMap[starterId] || 'New Template');

    // Open React Email panel automatically for custom template
    if (starterId === 'custom') {
      setShowReactEmail(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <EditorToolbar
        name={name}
        onNameChange={setName}
        mode={mode}
        onModeChange={setMode}
        previewDevice={previewDevice}
        onPreviewDeviceChange={setPreviewDevice}
        darkPreview={darkPreview}
        onDarkPreviewToggle={() => setDarkPreview((d) => !d)}
        saving={saving}
        onSave={() => save(false)}
        templateId={templateId}
        autoSaveStatus={autoSaveStatus}
      />

      <div className="flex flex-1 min-h-0">
        <div className="flex flex-1 min-w-0">

          {/* Code editor column */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Editor toolbar strip */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5 bg-[#1e1e1e] shrink-0">
              <span className="text-xs text-gray-600 flex-1">HTML</span>
              <button
                onClick={() => { closeSidePanels('reactemail'); setShowReactEmail((s) => !s); }}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  showReactEmail ? 'text-brand' : 'text-gray-500 hover:text-white'
                }`}
              >
                <Layers className="h-3 w-3" />
                <span>Components</span>
              </button>
              <button
                onClick={() => { closeSidePanels('snippets'); setShowSnippets((s) => !s); }}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  showSnippets ? 'text-brand' : 'text-gray-500 hover:text-white'
                }`}
              >
                <Puzzle className="h-3 w-3" />
                <span>Snippets</span>
              </button>
              <button
                onClick={() => { closeSidePanels('variables'); setShowVariables((s) => !s); }}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  showVariables ? 'text-brand' : 'text-gray-500 hover:text-white'
                }`}
              >
                <Braces className="h-3 w-3" />
                <span>Variables</span>
              </button>
            </div>

            <div className="flex-1 min-h-0">
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>

          {/* Side panels (mutually exclusive) */}
          {showReactEmail && (
            <ReactEmailPanel
              onInsert={handleComponentInsert}
              onClose={() => setShowReactEmail(false)}
            />
          )}
          {showSnippets && !showReactEmail && (
            <SnippetsPanel onInsert={handleSnippetInsert} onClose={() => setShowSnippets(false)} />
          )}
          {showVariables && !showReactEmail && !showSnippets && (
            <VariablesPanel
              code={code}
              variables={variables}
              onChange={setVariables}
              onClose={() => setShowVariables(false)}
            />
          )}
        </div>

        {/* Preview pane */}
        <div className="w-1/2 min-w-0 border-l border-white/10 flex flex-col">
          <div className="flex gap-3 px-4 py-2 border-b border-white/5 bg-[#1e1e1e] shrink-0">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject line..."
              className="flex-1 bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent text-xs text-gray-500 outline-none"
            >
              {['general', 'marketing', 'transactional', 'newsletter', 'security'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-h-0">
            <PreviewPane html={previewHtml} device={previewDevice} darkMode={darkPreview} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 border-t border-white/5 bg-[#1e1e1e] px-4 py-1.5 shrink-0">
        <span className="text-xs text-gray-600">{code.length} chars</span>
        <span className="text-xs text-gray-600">{extractVariables(code).length} variables</span>
        <span className="text-xs text-gray-600 ml-auto">{autoSaveStatus}</span>
      </div>

      {showStarters && (
        <StarterTemplates onSelect={handleStarterSelect} onClose={() => setShowStarters(false)} />
      )}
    </div>
  );
}
