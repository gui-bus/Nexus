import { Geist_Mono, Montserrat, Outfit } from "next/font/google"
import { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@bustamante_gui",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
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
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>

        {/* Google Analytics Placeholder */}
        {siteConfig.analytics.google && (
          <GoogleAnalytics gaId={siteConfig.analytics.google} />
        )}
      </body>
    </html>
  )
}
