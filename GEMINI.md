# Project Overview
This is a professional, production-ready Landing Page template utilizing the Next.js App Router (v16+), React 19, and Tailwind CSS v4. It features a centralized configuration, optimized SEO, multi-language support (next-intl), and high-performance assets.

## Main Technologies
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (Prefix-less routing)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)

## Core Features
- **Centralized Config:** Manage site name, description, SEO, and social links in `config/site.ts`.
- **SEO & Metadata:** Pre-configured Metadata API, `sitemap.ts`, and `robots.ts`.
- **Internationalization (i18n):** Support for English and Portuguese without URL prefixes, using cookies for persistence.
- **Performance:** Optimized fonts (Montserrat, Outfit, Geist), automatic sitemaps, and strict build validation.

## Building and Running
The project uses **pnpm** as the preferred package manager.

- **Development:** `pnpm dev`
- **Build:** `pnpm build`
- **Start:** `pnpm start`
- **Lint:** `pnpm lint`
- **Typecheck:** `pnpm typecheck`

## Project Structure
- `app/`: Routes, layouts, SEO (robots/sitemap), and global styles.
- `config/`: Site-wide configuration (`site.ts`).
- `i18n/`: Internationalization routing and request configuration.
- `messages/`: Translation JSON files.
- `components/`: UI and shared components (including `LanguageSwitcher`).
- `lib/`: Utility functions.

## Development Conventions
- **Internationalization:** Use `useTranslations` from `next-intl` for all UI text.
- **Metadata:** Update `siteConfig` in `config/site.ts` for project-specific SEO.
- **Path Aliases:** Use `@/` for root references.
- **Class Merging:** Use the `cn` utility.
- **Git Hooks (Husky):** Pre-commit linting and commit message validation.
- **Validation:** Always run `pnpm build` before committing.
