'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { extractVariables } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  subject: string;
  code: string;
  variables: string;
}

function SendEmailForm() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get('templateId');

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedId, setSelectedId] = useState(preselectedId || '');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('noreply@steply.tech');
  const [subject, setSubject] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const selectedTemplate = templates.find((t) => t.id === selectedId);
  const templateVars = selectedTemplate ? extractVariables(selectedTemplate.code) : [];

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((d) => { if (d.success) setTemplates(d.data); });
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject || '');
      setVariables({});
    }
  }, [selectedId, selectedTemplate]);

  const getProcessedHtml = () => {
    if (!selectedTemplate) return '';
    let html = selectedTemplate.code;
    for (const [key, val] of Object.entries(variables)) {
      html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val);
    }
    return html;
  };

  const handleSend = async () => {
    if (!to.trim()) { toast.error('Enter at least one recipient'); return; }
    if (!subject.trim()) { toast.error('Enter a subject line'); return; }
    if (!selectedTemplate) { toast.error('Select a template'); return; }

    setSending(true);
    setResult(null);
    try {
      const res = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to, from, subject,
          html: getProcessedHtml(),
          templateId: selectedId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: 'Email sent successfully.' });
        toast.success('Email sent!');
      } else {
        setResult({ success: false, message: data.error || 'Send failed' });
        toast.error(data.error || 'Send failed');
      }
    } catch {
      const message = 'Network error — please try again';
      setResult({ success: false, message });
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  const handleTestSend = async () => {
    const email = prompt('Send test to:');
    if (!email) return;
    const prevTo = to;
    setTo(email);
    await handleSend();
    setTo(prevTo);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink leading-none">
          Send Email
        </h1>
        <p className="mt-2 text-xs text-ink-muted font-mono tracking-wide">
          Choose a template, add recipients, and send.
        </p>
      </div>

      {/* Result banner */}
      {result && (
        <div
          className={`flex items-start gap-3 border p-4 mb-6 ${
            result.success
              ? 'border-success/30 bg-success/5 text-success'
              : 'border-danger/30 bg-danger/5 text-danger'
          }`}
        >
          {result.success
            ? <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
            : <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
          }
          <p className="text-sm">{result.message}</p>
        </div>
      )}

      <div className="space-y-6">

        {/* Template */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.2em] text-ink-muted uppercase mb-2">
            Template
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border border-rule bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-ink/30 transition-colors appearance-none"
          >
            <option value="">Select a template…</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Recipients */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.2em] text-ink-muted uppercase mb-2">
            Recipients
          </label>
          <textarea
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={"email@example.com, another@example.com\nOr one per line"}
            rows={3}
            className="w-full border border-rule bg-card px-3 py-2.5 text-sm text-ink placeholder-ink-faint font-mono outline-none focus:border-ink/30 transition-colors resize-none"
          />
          <p className="mt-1.5 font-mono text-[9px] tracking-wide text-ink-faint">
            Separate multiple addresses with commas or newlines
          </p>
        </div>

        {/* From */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.2em] text-ink-muted uppercase mb-2">
            From Address
          </label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="noreply@example.com"
            className="w-full border border-rule bg-card px-3 py-2.5 text-sm text-ink placeholder-ink-faint outline-none focus:border-ink/30 transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.2em] text-ink-muted uppercase mb-2">
            Subject Line
          </label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject…"
            className="w-full border border-rule bg-card px-3 py-2.5 text-sm text-ink placeholder-ink-faint outline-none focus:border-ink/30 transition-colors"
          />
        </div>

        {/* Variables */}
        {templateVars.length > 0 && (
          <div>
            <label className="block font-mono text-[9px] tracking-[0.2em] text-ink-muted uppercase mb-2">
              Variables
            </label>
            <div className="border border-rule bg-card divide-y divide-rule">
              {templateVars.map((v) => (
                <div key={v} className="flex items-center gap-4 px-4 py-3">
                  <code className="font-mono text-[10px] text-brand w-28 shrink-0">
                    {`{{${v}}}`}
                  </code>
                  <input
                    value={variables[v] || ''}
                    onChange={(e) =>
                      setVariables((prev) => ({ ...prev, [v]: e.target.value }))
                    }
                    placeholder={`Value for ${v}`}
                    className="flex-1 bg-transparent border-0 border-b border-rule text-sm text-ink placeholder-ink-faint outline-none focus:border-ink/40 pb-0.5 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-rule">
          <button
            onClick={handleSend}
            disabled={sending || !selectedId || !to.trim() || !subject.trim()}
            className="flex items-center gap-2 bg-ink text-ink-inverse px-5 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-ink/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {sending
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <Send className="h-3.5 w-3.5" />
            }
            Send Email
          </button>
          <button
            onClick={handleTestSend}
            disabled={sending || !selectedId}
            className="flex items-center gap-2 border border-rule px-5 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-ink-muted hover:text-ink hover:border-ink/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Send Test
          </button>
        </div>

      </div>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-5 w-5 text-ink-faint animate-spin" />
        </div>
      }
    >
      <SendEmailForm />
    </Suspense>
  );
}
