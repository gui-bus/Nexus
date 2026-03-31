export const siteConfig = {
  name: "Landing Page Template",
  shortName: "LandingTemplate",
  url: "https://example.com",
  ogImage: "https://example.com/og.png",
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
  analytics: {
    google: process.env.NEXT_PUBLIC_GA_ID || "",
    facebook: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
