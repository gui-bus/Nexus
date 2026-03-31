import { Geist_Mono, Montserrat, Outfit } from "next/font/google"
import { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import { GoogleAnalytics } from "@next/third-parties/google"

import "@/src/app/globals.css"
import { ThemeProvider } from "@/src/components/common/themeProvider"
import { cn } from "@/src/lib/utils/utils"
import { siteConfig } from "@/src/config/site"

const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Config")

  return {
    title: {
      default: t("name"),
      template: `%s | ${t("name")}`,
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: t("name"),
      description: t("description"),
      siteName: t("name"),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: t("name"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("name"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.JSX.Element> {
  const locale = await getLocale()
  const messages = await getMessages()
  const t = await getTranslations("Config")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("name"),
    description: t("description"),
    url: siteConfig.url,
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        montserrat.variable,
        outfitHeading.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="mx-auto w-full max-w-440">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>

        {siteConfig.analytics.google && (
          <GoogleAnalytics gaId={siteConfig.analytics.google} />
        )}
      </body>
    </html>
  )
}
