<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Project Conventions

## Stack
- **Framework**: Next.js 16.3 App Router
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Motion**: `motion` package (import from `"motion/react"`)
- **Page transitions**: React 19 `<ViewTransition>` (native, zero bundle)
- **Language**: TypeScript (strict)

## File Structure
- `components/ui/` — Reusable primitives (buttons, cards, theme-toggle, animated wrappers)
- `components/sections/` — Page-specific sections (hero, about, app-showcase, contact)
- `lib/` — Utilities (rate limiting, file validation, app metadata)
- `app/` — Routes only (page.tsx, layout.tsx, route.ts)
- `app/api/` — API route handlers

### SRP File Placement
- `db/{table}.query.ts` — All `useQuery` hooks for that table (one file per table)
- `db/{table}.mutation.ts` — All `useMutation` hooks for that table (one file per table)
- `db/services/{table}.service.ts` — Raw Supabase CRUD operations (no React hooks, one file per table)
- `hooks/` — Only hooks with side effects (subscriptions, event listeners, timers). NOT query/mutation wrappers.
- Only create files for tables we actively interact with (e.g., `documents`, not `profiles`).

## Styling Rules
- **Tokens only**: Use Tailwind `@theme` variables — no arbitrary hex values in components
- **Semantic classes**: `bg-background`, `text-foreground`, `bg-primary`, `text-muted`, etc.
- **Dark mode**: Token-based (vars swap under `.dark`), use `dark:` prefix only for one-off overrides
- **Responsive**: Use `sm:`, `md:`, `lg:` breakpoints — never hardcode widths

## Motion Rules
- Import from `"motion/react"` (not `"framer-motion"`)
- Use `LazyMotion` + `domAnimation` for bundle optimization
- Reusable wrappers in `components/ui/animated.tsx`: `FadeIn`, `SlideUp`, `StaggerChildren`
- Page transitions via `<ViewTransition>` — wrap content in `page.tsx`, never in `layout.tsx`
- Always respect `prefers-reduced-motion`

## File Upload / API Security
- Validate magic bytes via `file-type` (never trust client MIME)
- Generate UUID filenames (never store user-supplied names)
- Enforce file size limits at application level
- Rate limit: 5 requests/min per IP (in-memory sliding window)
- Set `X-Content-Type-Options: nosniff` header

## Code Quality
- TypeScript strict mode — no `any` types
- Run `npm run lint` before committing
- Run `npm run build` to verify no type errors
- Prefer Server Components by default — add `"use client"` only when needed (motion, hooks, events)

## Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`
- One logical change per commit
