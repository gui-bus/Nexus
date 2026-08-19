import { env } from "./env"

export const siteConfig = {
  name: "Nexus Enterprise Boilerplate",
  shortName: "NexusApp",
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og.png`,
  authors: [
    {
      name: "Guilherme Bustamante",
      url: "https://github.com/gui-bus",
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
    google: env.NEXT_PUBLIC_GA_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
