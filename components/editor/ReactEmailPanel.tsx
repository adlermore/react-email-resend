'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

interface EmailComponent {
  tag: string;
  label: string;
  description: string;
  snippet: string;
}

interface Group {
  label: string;
  components: EmailComponent[];
}

const groups: Group[] = [
  {
    label: 'Structure',
    components: [
      {
        tag: '<Html>',
        label: 'Full Template Shell',
        description: 'Complete email wrapper with DOCTYPE, head, body',
        snippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Email</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,sans-serif;">
  <!-- Inbox preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;">{{previewText}}</div>

  <!-- Email container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;">
          <!-- ✏️ Build your email here -->
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      },
      {
        tag: '<Container>',
        label: 'Container',
        description: 'Max-width centered email wrapper (600px)',
        snippet: `<table width="600" cellpadding="0" cellspacing="0" align="center"
  style="max-width:600px;width:100%;background:#ffffff;">
  <tr>
    <td style="padding:32px 40px;">
      <!-- content -->
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Section>',
        label: 'Section',
        description: 'Block-level content section',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="padding:24px 40px;">
      <!-- section content -->
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Row> + <Column>',
        label: 'Two Columns',
        description: 'Side-by-side columns (50/50)',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="50%" style="padding:16px 20px 16px 40px;vertical-align:top;">
      <!-- left column -->
      <p style="font-size:15px;color:#374151;margin:0;">Left content</p>
    </td>
    <td width="50%" style="padding:16px 40px 16px 20px;vertical-align:top;">
      <!-- right column -->
      <p style="font-size:15px;color:#374151;margin:0;">Right content</p>
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Row> + <Column>',
        label: 'Three Columns',
        description: 'Three equal-width columns',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="33%" style="padding:16px 12px 16px 40px;vertical-align:top;text-align:center;">
      <p style="font-size:14px;color:#374151;margin:0;">Column 1</p>
    </td>
    <td width="34%" style="padding:16px 12px;vertical-align:top;text-align:center;">
      <p style="font-size:14px;color:#374151;margin:0;">Column 2</p>
    </td>
    <td width="33%" style="padding:16px 40px 16px 12px;vertical-align:top;text-align:center;">
      <p style="font-size:14px;color:#374151;margin:0;">Column 3</p>
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Hr>',
        label: 'Divider',
        description: 'Horizontal rule separator',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="padding:0 40px;">
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Spacer',
        label: 'Spacer',
        description: 'Vertical whitespace block',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="height:32px;line-height:32px;">&nbsp;</td></tr>
</table>`,
      },
    ],
  },
  {
    label: 'Typography',
    components: [
      {
        tag: '<Heading>',
        label: 'Heading H1',
        description: 'Large display heading',
        snippet: `<h1 style="font-size:32px;font-weight:800;color:#111827;
  margin:0 0 16px;line-height:1.2;letter-spacing:-0.5px;">
  {{headingText}}
</h1>`,
      },
      {
        tag: '<Heading as="h2">',
        label: 'Heading H2',
        description: 'Section subheading',
        snippet: `<h2 style="font-size:22px;font-weight:700;color:#111827;
  margin:0 0 12px;line-height:1.3;">
  {{subheading}}
</h2>`,
      },
      {
        tag: '<Text>',
        label: 'Paragraph',
        description: 'Body text paragraph',
        snippet: `<p style="font-size:15px;line-height:1.7;color:#374151;margin:0 0 16px;">
  {{textContent}}
</p>`,
      },
      {
        tag: '<Text>',
        label: 'Small / Caption',
        description: 'Small secondary text',
        snippet: `<p style="font-size:12px;line-height:1.5;color:#9ca3af;margin:0 0 8px;">
  {{captionText}}
</p>`,
      },
      {
        tag: '<Preview>',
        label: 'Preview Text',
        description: 'Hidden text shown in inbox preview',
        snippet: `<!-- Preview text: shown in email client before opening -->
<div style="display:none;max-height:0;overflow:hidden;
  font-size:1px;line-height:1px;color:#ffffff;">
  {{previewText}}
</div>`,
      },
    ],
  },
  {
    label: 'Interactive',
    components: [
      {
        tag: '<Button>',
        label: 'Primary Button',
        description: 'Solid CTA button link',
        snippet: `<table cellpadding="0" cellspacing="0">
  <tr>
    <td style="border-radius:4px;background:#0D0D0D;">
      <a href="{{buttonUrl}}"
        style="display:inline-block;padding:12px 28px;font-size:14px;
          font-weight:600;color:#F2F0EA;text-decoration:none;
          letter-spacing:0.04em;">
        {{buttonLabel}}
      </a>
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Button>',
        label: 'Brand Button',
        description: 'Accent-color CTA button',
        snippet: `<table cellpadding="0" cellspacing="0">
  <tr>
    <td style="border-radius:4px;background:#D4380D;">
      <a href="{{buttonUrl}}"
        style="display:inline-block;padding:12px 28px;font-size:14px;
          font-weight:600;color:#ffffff;text-decoration:none;
          letter-spacing:0.04em;">
        {{buttonLabel}} →
      </a>
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Button>',
        label: 'Ghost Button',
        description: 'Outlined button with transparent background',
        snippet: `<table cellpadding="0" cellspacing="0">
  <tr>
    <td style="border-radius:4px;border:1px solid #E2E0DA;">
      <a href="{{buttonUrl}}"
        style="display:inline-block;padding:11px 27px;font-size:14px;
          font-weight:600;color:#0D0D0D;text-decoration:none;
          letter-spacing:0.04em;">
        {{buttonLabel}}
      </a>
    </td>
  </tr>
</table>`,
      },
      {
        tag: '<Link>',
        label: 'Text Link',
        description: 'Inline hyperlink',
        snippet: `<a href="{{linkUrl}}"
  style="color:#D4380D;font-size:14px;font-weight:600;
    text-decoration:underline;">
  {{linkText}}
</a>`,
      },
    ],
  },
  {
    label: 'Media & Content',
    components: [
      {
        tag: '<Img>',
        label: 'Full-Width Image',
        description: 'Edge-to-edge responsive image',
        snippet: `<img src="{{imageUrl}}" alt="{{altText}}"
  width="600" style="display:block;max-width:100%;
    height:auto;border:0;" />`,
      },
      {
        tag: '<Img> + <Text>',
        label: 'Image + Text',
        description: 'Image on left, text on right',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="200" style="padding:24px 16px 24px 40px;vertical-align:top;">
      <img src="{{imageUrl}}" alt="{{altText}}"
        width="160" style="display:block;max-width:100%;height:auto;border:0;" />
    </td>
    <td style="padding:24px 40px 24px 16px;vertical-align:top;">
      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:0 0 8px;">
        {{title}}
      </h3>
      <p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 16px;">
        {{description}}
      </p>
      <a href="{{url}}" style="color:#D4380D;font-size:13px;font-weight:600;
        text-decoration:none;">Read more →</a>
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Hero',
        label: 'Hero Section',
        description: 'Bold full-width hero with CTA',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#0D0D0D;">
  <tr>
    <td style="padding:56px 40px;text-align:center;">
      <h1 style="font-size:36px;font-weight:800;color:#F2F0EA;
        margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px;">
        {{heroHeading}}
      </h1>
      <p style="font-size:16px;line-height:1.7;color:#B0ADA8;margin:0 0 32px;">
        {{heroSubtext}}
      </p>
      <table cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td style="background:#D4380D;border-radius:4px;">
            <a href="{{ctaUrl}}"
              style="display:inline-block;padding:14px 32px;font-size:14px;
                font-weight:700;color:#ffffff;text-decoration:none;
                letter-spacing:0.06em;text-transform:uppercase;">
              {{ctaLabel}}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Card',
        label: 'Content Card',
        description: 'Bordered card with title, text, and link',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0"
  style="border:1px solid #E2E0DA;">
  <tr>
    <td style="padding:24px 28px;">
      <p style="font-size:11px;font-weight:600;color:#B0ADA8;
        text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px;">
        {{category}}
      </p>
      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:0 0 10px;">
        {{cardTitle}}
      </h3>
      <p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 18px;">
        {{cardBody}}
      </p>
      <a href="{{cardUrl}}" style="color:#D4380D;font-size:13px;
        font-weight:600;text-decoration:none;">
        {{cardLinkLabel}} →
      </a>
    </td>
  </tr>
</table>`,
      },
    ],
  },
  {
    label: 'Email Shell',
    components: [
      {
        tag: 'Header',
        label: 'Header with Logo',
        description: 'Brand header with company name',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#0D0D0D;">
  <tr>
    <td style="padding:24px 40px;">
      <span style="font-size:18px;font-weight:800;color:#F2F0EA;
        letter-spacing:0.15em;text-transform:uppercase;">
        {{companyName}}
      </span>
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Header',
        label: 'Header with Image Logo',
        description: 'Brand header with an image logo',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#ffffff;border-bottom:1px solid #E2E0DA;">
  <tr>
    <td style="padding:20px 40px;">
      <img src="{{logoUrl}}" alt="{{companyName}}"
        width="120" height="auto"
        style="display:block;border:0;" />
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Footer',
        label: 'Footer with Links',
        description: 'Standard footer with unsubscribe and legal links',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#F7F6F2;border-top:1px solid #E2E0DA;">
  <tr>
    <td style="padding:24px 40px;text-align:center;">
      <p style="font-size:12px;color:#9ca3af;margin:0 0 8px;">
        © 2026 {{companyName}}. All rights reserved.
      </p>
      <p style="font-size:12px;color:#9ca3af;margin:0;">
        <a href="{{unsubscribeUrl}}"
          style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a>
        &nbsp;·&nbsp;
        <a href="{{privacyUrl}}"
          style="color:#9ca3af;text-decoration:underline;">Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="{{addressUrl}}"
          style="color:#9ca3af;text-decoration:underline;">Our Address</a>
      </p>
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Social',
        label: 'Social Links',
        description: 'Text-based social media links row',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="padding:16px 40px;text-align:center;">
      <a href="{{twitterUrl}}"
        style="font-size:12px;color:#6b7280;text-decoration:none;
          margin:0 10px;font-weight:600;">Twitter</a>
      <a href="{{linkedinUrl}}"
        style="font-size:12px;color:#6b7280;text-decoration:none;
          margin:0 10px;font-weight:600;">LinkedIn</a>
      <a href="{{instagramUrl}}"
        style="font-size:12px;color:#6b7280;text-decoration:none;
          margin:0 10px;font-weight:600;">Instagram</a>
    </td>
  </tr>
</table>`,
      },
      {
        tag: 'Alert',
        label: 'Alert / Notice',
        description: 'Highlighted notice or warning block',
        snippet: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="padding:0 40px;">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#fef9c3;border-left:3px solid #eab308;padding:14px 18px;">
        <tr>
          <td style="font-size:14px;line-height:1.5;color:#713f12;">
            ⚠️ {{alertMessage}}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
      },
    ],
  },
];

interface ReactEmailPanelProps {
  onInsert: (snippet: string) => void;
  onClose: () => void;
}

export default function ReactEmailPanel({ onInsert, onClose }: ReactEmailPanelProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.label, true]))
  );

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="w-72 border-l border-rule bg-canvas flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-rule shrink-0">
        <div>
          <span className="text-xs font-semibold text-ink">React Email</span>
          <p className="font-mono text-[9px] tracking-widest text-ink-faint uppercase mt-0.5">
            Components
          </p>
        </div>
        <button onClick={onClose} className="text-ink-faint hover:text-ink transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Component list */}
      <div className="flex-1 overflow-auto">
        {groups.map((group) => (
          <div key={group.label}>
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center justify-between px-4 py-2.5 border-b border-rule hover:bg-card transition-colors"
            >
              <span className="font-mono text-[9px] tracking-[0.18em] text-ink-muted uppercase font-semibold">
                {group.label}
              </span>
              {openGroups[group.label]
                ? <ChevronDown className="h-3 w-3 text-ink-faint" />
                : <ChevronRight className="h-3 w-3 text-ink-faint" />
              }
            </button>

            {/* Components */}
            {openGroups[group.label] && (
              <div className="py-1.5 px-2 space-y-1">
                {group.components.map((comp) => (
                  <button
                    key={comp.tag + comp.label}
                    onClick={() => onInsert(comp.snippet)}
                    title={`Insert ${comp.label}`}
                    className="w-full text-left px-3 py-2.5 border border-rule bg-card hover:border-ink/20 hover:bg-canvas transition-colors group"
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span className="font-mono text-[10px] text-brand truncate">
                        {comp.tag}
                      </span>
                      <span className="font-mono text-[8px] tracking-widest text-ink-faint uppercase shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        insert
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-ink leading-tight">
                      {comp.label}
                    </p>
                    <p className="text-[10px] text-ink-muted mt-0.5 leading-snug">
                      {comp.description}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
