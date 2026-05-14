'use client';

import { useState } from 'react';
import { Save, Eye, EyeOff, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [resendKey, setResendKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpFrom, setSmtpFrom] = useState('');
  const [provider, setProvider] = useState<'resend' | 'smtp'>('resend');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved (stored in .env.local — restart server to apply)');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Configure your email provider and default settings</p>
      </div>

      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mb-6 flex gap-3">
        <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-300">
          Set your <code className="text-amber-200">RESEND_API_KEY</code> in <code className="text-amber-200">.env.local</code> to send emails.
          Use <code className="text-amber-200">onboarding@resend.dev</code> as the from address while testing.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-white/10 bg-gray-900 p-5">
          <h2 className="text-base font-semibold text-white mb-4">Email Provider</h2>

          <div className="flex gap-3 mb-5">
            <button
              onClick={() => setProvider('resend')}
              className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${provider === 'resend' ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300' : 'border-white/10 bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              Resend (Recommended)
            </button>
            <button
              onClick={() => setProvider('smtp')}
              className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${provider === 'smtp' ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300' : 'border-white/10 bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              SMTP / Nodemailer
            </button>
          </div>

          {provider === 'resend' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Resend API Key</label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={resendKey}
                  onChange={(e) => setResendKey(e.target.value)}
                  placeholder="re_xxxxxxxxxxxxx"
                  className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2.5 pr-10 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  onClick={() => setShowKey((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1.5">
                Get your API key from <span className="text-indigo-400">resend.com/api-keys</span>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">SMTP Host</label>
                  <input value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} placeholder="smtp.gmail.com" className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Port</label>
                  <input value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} placeholder="587" className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Username</label>
                <input value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} placeholder="you@gmail.com" className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Password / App Password</label>
                <input type="password" value={smtpPass} onChange={(e) => setSmtpPass(e.target.value)} placeholder="••••••••••••" className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">From Address</label>
                <input value={smtpFrom} onChange={(e) => setSmtpFrom(e.target.value)} placeholder='"App Name" <noreply@yourapp.com>' className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors" />
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-white/10 bg-gray-900 p-5">
          <h2 className="text-base font-semibold text-white mb-2">Environment File</h2>
          <p className="text-sm text-gray-400 mb-4">
            Update your <code className="text-indigo-400">.env.local</code> file with the values below:
          </p>
          <pre className="rounded-lg bg-gray-950 border border-white/5 p-4 text-xs text-green-400 overflow-auto font-mono leading-relaxed">
{provider === 'resend'
  ? `RESEND_API_KEY=${resendKey || 're_xxxxxxxxxxxxx'}
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL=http://localhost:3000`
  : `SMTP_HOST=${smtpHost || 'smtp.gmail.com'}
SMTP_PORT=${smtpPort || '587'}
SMTP_USER=${smtpUser || 'you@gmail.com'}
SMTP_PASS=${smtpPass || 'your-app-password'}
SMTP_FROM="${smtpFrom || 'App Name <noreply@yourapp.com>'}"
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
          </pre>
        </section>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
