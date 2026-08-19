import { Metadata, Viewport } from "next"

import { GoogleAnalytics } from "@next/third-parties/google"

import { ThemeProvider } from "@/src/components/common/themeProvider"

import { cn } from "@/src/lib/utils/utils"

import { fontVariables } from "@/src/config/fonts"
import { siteConfig } from "@/src/config/site"

import "@/src/app/globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set("title", siteConfig.name)
  ogUrl.searchParams.set("description", "Nexus Enterprise Boilerplate")

  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: "Nexus Enterprise Boilerplate",
    keywords: ["Next.js", "React", "Tailwind CSS", "Boilerplate"],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: siteConfig.name,
      description: "Nexus Enterprise Boilerplate",
      siteName: siteConfig.name,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: "Nexus Enterprise Boilerplate",
      images: [ogUrl.toString()],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.JSX.Element> {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={cn("antialiased", fontVariables)}
    >
      <body className="mx-auto w-full max-w-440">
        <ThemeProvider>{children}</ThemeProvider>
        {siteConfig.analytics.google && (
          <GoogleAnalytics gaId={siteConfig.analytics.google} />
        )}
      </body>
    </html>
  )
}
