export const siteConfig = {
  name: "Landing Page Template",
  shortName: "LandingTemplate",
  description:
    "A professional landing page template built with Next.js, Tailwind CSS and shadcn/ui.",
  url: "https://example.com",
  ogImage: "https://example.com/og.png",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Landing Page",
    "Template",
  ],
  authors: [
    {
      name: "Guilherme Bustamante",
      url: "https://github.com/bustamante-gui",
    },
  ],
  creator: "Guilherme Bustamante",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
  },
  contact: {
    email: "contact@example.com",
  },
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // Analytics IDs (Use environment variables for production)
  analytics: {
    google: process.env.NEXT_PUBLIC_GA_ID || "",
    facebook: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
