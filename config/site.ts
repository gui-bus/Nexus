export const siteConfig = {
  name: "Landing Page Template",
  url: "https://example.com",
  ogImage: "https://example.com/og.png",
  description:
    "A professional landing page template built with Next.js, Tailwind CSS and shadcn/ui.",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
  },
  contact: {
    email: "contact@example.com",
  },
  locales: ["pt", "en"],
  defaultLocale: "pt",
}

export type SiteConfig = typeof siteConfig
