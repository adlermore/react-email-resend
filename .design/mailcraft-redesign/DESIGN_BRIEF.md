# Design Brief: MailCraft Redesign

## Problem

Developers and marketers building email systems spend significant time in MailCraft. The current interface looks like every other dark-mode SaaS tool — generic indigo/gray palette, Inter-like defaults, predictable card grids. It communicates nothing about craft, precision, or quality — which is ironic for a tool whose whole purpose is producing beautifully designed emails.

## Solution

Redesign the shell, dashboard, and send flow with a Swiss/International Typographic aesthetic: black sidebar, warm cream canvas, tomato-red accent, strong typographic hierarchy. The tool should feel like a professional instrument — authoritative, precise, and distinctive.

## Experience Principles

1. **Structure is visible** — Grid, rules, and borders are design elements, not afterthoughts. Whitespace is earned, not defaulted.
2. **Typography does the work** — Scale, weight, and tracking carry hierarchy. No icons or color where type alone suffices.
3. **Contrast over decoration** — The black sidebar against cream canvas is the visual statement. Nothing else needs to perform.

## Aesthetic Direction

- **Philosophy**: Swiss / International Typographic
- **Tone**: Authoritative, precise, professional tool
- **Reference points**: Neue Grafik, early Helvetica branding, Figma's sidebar treatment, Linear's typographic density
- **Anti-references**: Generic dark SaaS (gray-950 + indigo), Material Design cards, rounded-everything UI kits

## Existing Patterns

- Typography: Geist Sans / Geist Mono (replacing with Syne + DM Sans + JetBrains Mono)
- Colors: gray-950 background + indigo-600 accent (replacing entirely)
- Components: AppShell, Sidebar, Header, TemplateCard, Dashboard, SendForm

## Component Inventory

| Component | Status | Notes |
|---|---|---|
| AppShell | Modify | Update background color, toaster theme |
| Sidebar | Modify | Black rail, Swiss nav treatment |
| Header | Modify | Thin rule bar, clean breadcrumbs |
| TemplateCard | Modify | White card, accent top bar, text-only actions |
| Dashboard page | Modify | Cream canvas, Swiss filter strip |
| Send page | Modify | Structured form, Swiss inputs |
| globals.css | Rewrite | Full design token system |
| layout.tsx | Modify | Syne + DM Sans + JetBrains Mono fonts |

## Key Interactions

- Sidebar nav: left-border active state with brand-red dot indicator
- Cards: color accent bar at top encodes category at a glance
- Buttons/actions: all-caps small text, no rounded pill shapes
- Filter tabs: toggle between filled (active) and bordered (inactive) states

## Responsive Behavior

- Sidebar: fixed 208px (w-52), no collapse on desktop; hidden on mobile
- Dashboard grid: 1 → 2 → 3 → 4 columns at sm/lg/xl
- Send form: max-width 640px, centered

## Accessibility Requirements

- Contrast: all text meets WCAG AA against respective backgrounds
- Focus: visible focus rings on all interactive elements
- Keyboard: full navigation without mouse

## Out of Scope

- Template editor (CodeEditor, PreviewPane, TemplateEditor) — complex, separate pass
- Settings page
- Command palette visual redesign
- Mobile navigation drawer
