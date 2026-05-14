'use client';

import { extractVariables } from '@/lib/utils';
import { X } from 'lucide-react';

interface VariablesPanelProps {
  code: string;
  variables: Record<string, string>;
  onChange: (variables: Record<string, string>) => void;
  onClose: () => void;
}

export default function VariablesPanel({ code, variables, onChange, onClose }: VariablesPanelProps) {
  const detectedVars = extractVariables(code);

  const handleChange = (key: string, value: string) => {
    onChange({ ...variables, [key]: value });
  };

  return (
    <div className="w-64 border-l border-white/10 bg-gray-900 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm font-semibold text-white">Variables</span>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {detectedVars.length === 0 ? (
          <p className="text-xs text-gray-500">
            Use <code className="text-indigo-400">{`{{variableName}}`}</code> in your template to define variables.
          </p>
        ) : (
          detectedVars.map((varName) => (
            <div key={varName}>
              <label className="text-xs font-medium text-gray-400 mb-1 block">{`{{${varName}}}`}</label>
              <input
                value={variables[varName] || ''}
                onChange={(e) => handleChange(varName, e.target.value)}
                placeholder={`Enter ${varName}...`}
                className="w-full rounded-md border border-white/10 bg-gray-800 px-3 py-1.5 text-xs text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
