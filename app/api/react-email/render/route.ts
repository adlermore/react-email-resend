import { NextRequest, NextResponse } from 'next/server';
import { createRequire } from 'module';
import React from 'react';
import * as ReactEmailComponents from '@react-email/components';
import { render } from '@react-email/render';
import { transform } from 'esbuild';

export const runtime = 'nodejs';

// Only use createRequire for true CJS-only modules (react/jsx-runtime, react-dom)
const nodeRequire = createRequire(import.meta.url);

export async function POST(req: NextRequest) {
  const body = await req.json() as { code: string; props?: Record<string, unknown> };
  const { code, props } = body;

  try {
    const result = await transform(code, {
      loader: 'tsx',
      format: 'cjs',
      target: 'node18',
      jsx: 'automatic',
    });

    const customRequire = (id: string): unknown => {
      if (id === 'react-email' || id === '@react-email/components') return ReactEmailComponents;
      if (id === 'react') return React;
      if (id.startsWith('react/')) return nodeRequire(id);
      if (id === 'react-dom' || id === 'react-dom/server') return nodeRequire(id);
      // Mock local file imports (./theme, ./fonts, etc.) — return empty object
      if (id.startsWith('./') || id.startsWith('../') || id.startsWith('@/')) return {};
      throw new Error(
        `Unsupported import: "${id}". Only @react-email/components imports are supported; local imports are mocked.`
      );
    };

    const mod: { exports: Record<string, unknown> } = { exports: {} };
    // eslint-disable-next-line no-new-func
    new Function('require', 'module', 'exports', result.code)(customRequire, mod, mod.exports);

    const exports = mod.exports;
    const Component = (
      exports['default'] ??
      Object.values(exports).find((v) => typeof v === 'function')
    ) as React.ComponentType<Record<string, unknown>>;

    if (!Component) {
      throw new Error('No default export found. Make sure your component is the default export.');
    }

    const previewProps: Record<string, unknown> =
      props ??
      (Component as unknown as { PreviewProps?: Record<string, unknown> }).PreviewProps ??
      {};

    const html = await render(React.createElement(Component, previewProps));

    return NextResponse.json({ html });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}
