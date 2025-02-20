'use client'
import React from "react";
import localFont from "next/font/local";
import Head from "next/head";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { reportWebVitals } from '@/lib/vitals';
import { useWebVitals } from '@/hooks/useWebVitals';
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const metadata = {
  title: "NaisCorp",
  description: "NaisCorp website.",
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: "NaisCorp",
    description: "The connected workspace where better, faster work happens.",
    url: 'https://example.com',
    siteName: 'NaisCorp',
    images: [
      {
        url: '/global/app_logos/apple-icon.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: "/global/app_logos/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/global/app_logos/favicon.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/global/app_logos/apple-icon.jpg",
    shortcut: "/global/app_logos/icon.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useWebVitals(reportWebVitals);
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://your-domain.com/" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://your-domain.com/twitter-image.jpg" />
        <link rel="icon" href={metadata.icons.icon[0].url} />
        <link rel="apple-touch-icon" href={metadata.icons.apple} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://shopify-app.doc2product.com" />
        <Script 
          async 
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9VCKN3KBJJ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9VCKN3KBJJ');
          `}
        </Script>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <React.StrictMode>
          <ApolloProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="telamonix-theme-2"
            >
                {children}
            </ThemeProvider>
          </ApolloProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}


