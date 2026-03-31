# Landing Page Template - Development Manual

This project is a high-performance, production-ready Landing Page template utilizing the Next.js App Router (v16+), React 19, and Tailwind CSS v4. Adhere strictly to these mandates.

## Core Mandates

### 1. Technical Integrity & Typing
- **STRICT TYPES:** `any` is strictly FORBIDDEN. Use `unknown` or specific interfaces/types.
- **EXPLICIT RETURNS:** All functions and React components MUST have explicit return types.
- **TS-STRICT:** Maintain `strict: true` in `tsconfig.json` at all times.
- **ENV VALIDATION:** All environment variables MUST be defined in `src/config/env.ts` and validated via Zod.
- **VALIDATION:** Always run `pnpm build` before finality. A task is only complete when it passes the production build.
- **CI/CD:** All changes MUST pass the GitHub Actions pipeline (Lint, Typecheck, i18n Sync, Build).
- **QUALITY GATE:** 
  - A Husky `pre-commit` hook runs `pnpm test` and `lint-staged` automatically.
  - A Husky `pre-push` hook runs `pnpm build` automatically.
  - NEVER bypass these gates.

### 2. Code Style & Documentation
- **NO COMMENTS:** NEVER include comments in the source code. The code must be self-explanatory through clean naming and structure.
- **IMPORT ORDER:** Imports MUST be sorted automatically via Prettier (React, Next, Third-party, Internal, Local).
- **LOGGING:** `console.log` is strictly FORBIDDEN. Use the structured `logger` from `@/src/lib/logger`.
- **NAMING:** Use descriptive, camelCase for variables/functions and PascalCase for components.
- **SURGICAL UPDATES:** Apply minimal, targeted changes. Avoid unrelated refactoring.

### 3. Internationalization (next-intl)
- **UI TEXT:** NEVER hardcode strings in components. All user-facing text must be retrieved via `useTranslations` (client) or `getTranslations` (server).
- **TYPED KEYS:** Ensure `src/types/intl.d.ts` is updated when adding new translation namespaces to maintain type safety.
- **I18N SYNC:** All translation files (`messages/*.json`) MUST have identical keys. The build will fail if they are out of sync. Run `pnpm check-i18n` to verify.
- **METADATA:** Use `generateMetadata` in `layout.tsx` or `page.tsx` for locale-aware SEO.
- **ERRORS:** Use the `Errors` namespace in JSON for `error.tsx` and `not-found.tsx` messages.

### 4. Styling & Typography (Tailwind CSS v4)
- **BRANDING:** Prefer using centralized brand variables defined in `globals.css`.
- **FONTS:** All fonts MUST be defined in `src/config/fonts.ts`. Use the `fontVariables` constant in the root layout.
- **COLORS:** Use `oklch` for all custom color definitions for better accessibility and vibrancy.
- **DESIGN SYSTEM:**
  - **Corners:** Use `rounded-full` for small interactive elements (triggers) and `rounded-2xl` for containers/menus.
  - **Effects:** Use `backdrop-blur-sm` (or `xl`) for overlays and dropdowns.
  - **Minimalism:** Keep the UI clean, with subtle borders (`border-border/60`) and neutral backgrounds.

### 5. Architectural Standards
- **PATH ALIASES:** Always use `@/` for root-relative imports (e.g., `@/src/components/...`).
- **COMPONENT LOCATION:** 
  - `src/components/ui/`: Base shadcn/ui components.
  - `src/components/common/`: Shared, high-level components.
  - `src/app/`: Routes, layouts, and global styles.
- **SECURITY:** Maintain strict Content Security Policy (CSP) and security headers in `next.config.mjs`.
- **PERFORMANCE:** Use `pnpm analyze` to monitor bundle sizes and maintain edge runtime for dynamic routes where possible.
- **TESTING:** All business logic, utility functions, components, and configurations MUST have corresponding tests in `src/__tests__/` using Vitest. Run `pnpm test` regularly.
- **DEPLOYMENT:** Use the provided `Dockerfile` (multi-stage) for production. Ensure `output: "standalone"` is enabled in `next.config.mjs`.

## Mandatory Development Workflow

Before committing any change, you MUST execute the following sequence:

1. **`pnpm format`**: Ensures imports are sorted and code style is consistent.
2. **`pnpm check-i18n`**: Verifies all translation files are synchronized.
3. **`pnpm test`**: Ensures all unit and component tests pass.
4. **`pnpm typecheck`**: Validates TypeScript integrity.
5. **`pnpm build`**: Final validation for production readiness.

### Scaffolding (Industrial Productivity)
When creating new components, **NEVER** create files manually. Use the generator:
- **Command:** `pnpm generate`
- **When to use:** Every time you need a new component in `common` or `ui`.
- **What it does:** Generates the `.tsx` component file and its corresponding `.test.tsx` file already following all project standards (types, naming, mocks).

## Main Technologies
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Testing:** Vitest + React Testing Library + JSDOM
- **Logging:** Pino (Structured)
- **i18n:** next-intl (Prefix-less routing)
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **CI/CD:** GitHub Actions
- **Containerization:** Docker

## Scripts
- `pnpm dev`: Development server.
- `pnpm build`: Production build (includes i18n check).
- `pnpm test`: Run all tests (Unit + Component).
- `pnpm check-i18n`: Verify translation files sync.
- `pnpm analyze`: Analyze bundle sizes.
- `pnpm audit`: Run Lighthouse audit on all routes.
- `pnpm clean`: Wipe build caches and node_modules.
- `pnpm lint`: Code quality check.
- `pnpm typecheck`: Strict type verification.
- `pnpm format`: Format code and sort imports.
- `pnpm generate`: Create new components via Plop.js.
