'use client';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="h-full">
      <MonacoEditor
        height="100%"
        defaultLanguage="html"
        value={value}
        onChange={(v) => onChange(v || '')}
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
          formatOnPaste: true,
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
