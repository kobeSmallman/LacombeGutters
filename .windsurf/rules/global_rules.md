---
trigger: manual
---

### GLOBAL RULES (applies to all projects)

# 1. Component & File Structure
- Organize by **feature**; pages inside `app/` (or `pages/`) mirror URLs.
- Keep components reusable: shared UI sits in `/components`, feature‑specific UI sits in its feature folder.
- Max **two levels** of folder nesting for components.
- Name React components **PascalCase**; file names follow the same casing or kebab‑case—choose one per repo.
- Extract large component sub‑files (styles, tests) into a sibling folder rather than deep nesting.

# 2. Routing
- Follow the framework’s file‑based routing exactly (e.g. Next App Router).
- Use `layout.tsx` for shared nav/footers; nest layouts for sub‑sections.
- Dynamic routes use `[param]` or `[...segments]`.
- Keep route hierarchy shallow; collapse if >2 nested levels.

# 3. State Management
- **Local state** (`useState`, `useReducer`) for component‑only concerns.
- **Global state** only when truly shared; prefer Redux Toolkit or Zustand over Context if data is large/frequently updated.
- Use React Query/SWR for server cache; don’t store derived data twice.
- Always clean up effects (unsubscribe, clear timers).

# 4. Styling
- Tailwind utilities first; group classes logically (layout → spacing → color → modifiers).
- Abstract repeated utility bundles with `@apply` or `cva`.
- Define brand tokens in `tailwind.config.js`; avoid arbitrary hex codes.
- Mobile‑first: default styles = mobile, then `md:` `lg:` overrides.
- Maintain WCAG AA contrast; color alone never conveys meaning.
- shadcn/ui: extend components via variants or wrappers—never hack library files.

# 5. Version Control
- **Conventional Commits** (`feat:`, `fix:`, `docs:` …).  
  Summary ≤ 50 chars; body explains *why*.
- Branch from `main` using `feature/…`, `fix/…`, `docs/…`.
- No direct pushes to `main`; PR required, at least 1 review, CI green.
- Squash‑merge or rebase‑merge; delete merged branches.
- Commit early & often; keep each commit a coherent idea.

# 6. CI/CD
- GitHub Actions: lint → test → build for every push/PR.
- Cache `node_modules` & `.next/cache` to speed builds.
- Preview deploys on PR; auto‑deploy `main` to production.
- Env vars via platform secrets; never commit secrets.
- Always support quick rollback to previous build.

# 7. Documentation
- `README.md` includes: purpose, tech stack, setup, build/deploy, contribution guide.
- Comments explain **why**, not **what**; keep them updated.
- Store ADRs (Architecture Decision Records) in `docs/architecture/` for major design choices.

# 8. Testing
- Unit tests live next to source or under `__tests__/`.
- Use Vitest + Testing‑Library for React; Cypress/Playwright for e2e.
- CI must run tests; coverage target ≥ 80 %.

# 9. Accessibility
- Semantic HTML first (`<button>` over `<div role="button">`).
- All interactive elements keyboard‑operable & focus‑visible.
- Use `aria‑` only when semantics can’t express behavior.
- Dynamic updates announced via `aria‑live` where needed.

# 10. Code Quality Automation
- ESLint + Prettier + EditorConfig required; run on pre‑commit (Husky + lint‑staged).
- No `eslint-disable` without inline justification.

# 11. Team Etiquette
- Reviews seek clarity, maintainability, and consistency; be specific & respectful.
- Mention good work, not just issues.
- Outdated code/docs must be cleaned up as features evolve.

# 12. File Length Limits
- Any single source file ≤ 400 lines unless justified.
- Markdown docs ≤ 6 000 chars so Windsurf can ingest them.

### END
