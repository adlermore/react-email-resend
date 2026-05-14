# Information Architecture: MailCraft

## Site Map

- Dashboard `/` — template grid/list, stats, search, filter
- Templates `/templates` — alias / redirect to dashboard
  - New Template `/templates/new` — editor with starter picker
  - Edit Template `/templates/[id]` — editor for existing template
    - Preview `/templates/[id]/preview` — full-page preview
- Send Email `/send` — form: template select, recipients, variables, send
- Settings `/settings` — config (provider keys, defaults)

## Navigation Model

- **Primary navigation**: Sidebar rail (Dashboard, Templates, Send, Settings)
- **Secondary navigation**: In-page breadcrumbs in Header for depth > 1
- **Utility navigation**: ⌘K command palette for keyboard-first navigation
- **Mobile navigation**: Out of scope for this pass

## Content Hierarchy

### Dashboard
1. Page heading + stats (total templates, total sent) — context at a glance
2. Search + filter strip — primary interaction for finding templates
3. Template grid/list — the content
4. Empty state with CTA — onboarding path

### Template Editor
1. EditorToolbar (name, save, send button) — always visible
2. CodeEditor / VisualEditor — primary work area
3. PreviewPane — live feedback
4. VariablesPanel / SnippetsPanel — contextual tools

### Send Form
1. Template selector — must come first (drives subject + variables)
2. Recipients — the destination
3. From address + Subject — envelope metadata
4. Variables — dynamic content substitution
5. Send / Test Send actions

## User Flows

### Create and Send Template
1. Land on Dashboard → click "New Template"
2. Pick a starter template or blank
3. Edit code in Monaco editor, preview updates live
4. Save (auto-save or manual)
5. Click "Send" in toolbar → redirected to Send page with template preselected
6. Fill recipients + variables → Send

### Quick Send Existing
1. Dashboard → TemplateCard → "Send →" footer action
2. Send page opens with template preselected
3. Fill recipients → Send

## Naming Conventions

| Concept | Label in UI | Notes |
|---|---|---|
| Email template | Template | Not "campaign" or "email" |
| Send action | Send → | Arrow implies direction/action |
| Variable placeholders | `{{name}}` | Double-brace syntax, always monospace |
| Test send | Send Test | Not "preview send" |

## Component Reuse Map

| Component | Used on | Notes |
|---|---|---|
| AppShell | All pages | Wraps Sidebar + Header + main |
| Sidebar | All pages | Fixed rail |
| Header | All pages | Breadcrumbs change per route |
| TemplateCard | Dashboard, Templates | Grid and list variants |

## URL Strategy

- Static routes: `/`, `/templates`, `/send`, `/settings`
- Dynamic: `/templates/[id]` — CUID from Prisma
- Query params: `?templateId=<id>` for Send page preselection
