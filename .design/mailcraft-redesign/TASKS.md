# Build Tasks: MailCraft Redesign

Generated from: .design/mailcraft-redesign/DESIGN_BRIEF.md
Date: 2026-05-13

## Foundation
- [x] **Design tokens — globals.css**: Define `--color-canvas/card/rail/ink/brand/rule/success/danger` in `@theme`. Add `--font-display/sans/mono` via `@theme inline`. Set body background to `canvas`, remove dark class.
- [x] **Font swap — layout.tsx**: Replace Geist with Syne (display, 700/800), DM Sans (body), JetBrains Mono. Remove `dark` class from `<html>`.

## Core UI
- [x] **Sidebar redesign**: Black `bg-rail` rail, 208px fixed width. "MAILCRAFT" wordmark in Syne bold all-caps. Nav items as `text-xs` with left `border-brand` active indicator and brand dot. No collapse button.
- [x] **Header redesign**: 48px height, `border-rule` bottom. Breadcrumbs in `text-xs`. ⌘K button as monospace badge, no icon.
- [x] **AppShell update**: `bg-canvas` on main content wrapper. Toaster `position="bottom-right"` without `theme="dark"`.

## Core UI
- [x] **Dashboard redesign**: Syne display heading, ink CTA button (not indigo), flat filter tabs (filled/bordered toggle), divider-rule above grid.
- [x] **TemplateCard redesign**: White `bg-card` with `border-rule`. Accent top bar (2px) encodes category. Category label in mono uppercase. Name in Syne bold. Text-only "EDIT / SEND →" footer strip.
- [x] **Send page redesign**: Structured form at `max-w-2xl`. Labels as `text-xs tracking-widest uppercase font-mono`. Inputs with `border-rule` and `focus:border-ink/40`. Actions: filled ink button + bordered ghost button.

## Review
- [ ] **Design review**: Run /design-review against the brief once dev server is running.
