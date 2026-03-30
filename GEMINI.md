# Project Overview
This is a modern Next.js template utilizing the App Router, React 19, and Tailwind CSS v4. It is pre-configured with **shadcn/ui** for high-quality, accessible components and uses **Phosphor Icons** for iconography. The project is designed for performance and developer experience, featuring **Turbopack** for fast development builds.

## Main Technologies
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) for Dark/Light mode support.

## Building and Running
The project uses **pnpm** as the preferred package manager.

- **Development:** `pnpm dev` (Runs Next.js with Turbopack)
- **Build:** `pnpm build`
- **Start:** `pnpm start`
- **Lint:** `pnpm lint`
- **Format:** `pnpm format` (Uses Prettier with Tailwind CSS plugin)
- **Typecheck:** `pnpm typecheck`

## Project Structure
- `app/`: Contains the application routes, layouts, and global styles.
- `components/`:
  - `ui/`: shadcn/ui primitive components.
  - (Root): Shared application-specific components (e.g., `theme-provider.tsx`).
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions (e.g., `utils.ts` with the `cn` helper).
- `public/`: Static assets.

## Development Conventions
- **Path Aliases:** Use `@/` to reference the project root (e.g., `import { Button } from "@/components/ui/button"`).
- **Styling:** Tailwind CSS v4 is configured via CSS variables in `app/globals.css` using the `@theme inline` block.
- **Class Merging:** Always use the `cn` utility from `@/lib/utils` when merging Tailwind classes or handling conditional classes.
- **Fonts:**
  - **Sans:** Montserrat
  - **Heading:** Outfit
  - **Mono:** Geist Mono
- **Adding Components:** Use the shadcn CLI: `npx shadcn@latest add <component-name>`.
- **Git Hooks (Husky):**
  - **Pre-commit:** Automatically runs `lint-staged` (ESLint and Prettier) on staged `.ts` and `.tsx` files.
  - **Commit-msg:** Validates commit messages using `commitlint` (Conventional Commits).
- **Validation:** Always run `pnpm build` before committing to ensure no compilation or linting errors exist.
