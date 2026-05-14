'use client';

import Link from 'next/link';
import { Save, Send, Monitor, Smartphone, Moon, Code2, Eye, Loader2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  name: string;
  onNameChange: (name: string) => void;
  mode: 'code' | 'visual';
  onModeChange: (mode: 'code' | 'visual') => void;
  previewDevice: 'desktop' | 'mobile';
  onPreviewDeviceChange: (d: 'desktop' | 'mobile') => void;
  darkPreview: boolean;
  onDarkPreviewToggle: () => void;
  saving: boolean;
  onSave: () => void;
  templateId?: string;
  autoSaveStatus: string;
}

export default function EditorToolbar({
  name, onNameChange,
  mode, onModeChange,
  previewDevice, onPreviewDeviceChange,
  darkPreview, onDarkPreviewToggle,
  saving, onSave,
  templateId,
  autoSaveStatus,
}: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 bg-gray-950 px-4 py-2 h-12 shrink-0">
      <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
      </Link>

      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="min-w-0 flex-1 max-w-[220px] bg-transparent text-sm font-semibold text-white placeholder-gray-500 outline-none border-b border-transparent focus:border-indigo-500 transition-colors py-0.5"
        placeholder="Template name..."
      />

      <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-gray-900 p-0.5 ml-auto">
        <button
          onClick={() => onModeChange('code')}
          className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
            mode === 'code' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          )}
        >
          <Code2 className="h-3 w-3" /> Code
        </button>
        <button
          onClick={() => onModeChange('visual')}
          className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
            mode === 'visual' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          )}
        >
          <Eye className="h-3 w-3" /> Visual
        </button>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-gray-900 p-0.5">
        <button
          onClick={() => onPreviewDeviceChange('desktop')}
          className={cn('rounded-md p-1.5 text-xs transition-colors',
            previewDevice === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'
          )}
          title="Desktop preview"
        >
          <Monitor className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onPreviewDeviceChange('mobile')}
          className={cn('rounded-md p-1.5 text-xs transition-colors',
            previewDevice === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'
          )}
          title="Mobile preview"
        >
          <Smartphone className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onDarkPreviewToggle}
          className={cn('rounded-md p-1.5 text-xs transition-colors',
            darkPreview ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'
          )}
          title="Dark mode preview"
        >
          <Moon className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15 transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
        Save
      </button>

      <Link
        href={templateId ? `/send?templateId=${templateId}` : '/send'}
        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
      >
        <Send className="h-3.5 w-3.5" /> Send
      </Link>

      <span className="text-xs text-gray-600 hidden lg:block shrink-0">{autoSaveStatus}</span>
    </div>
  );
}
