import { Geist, Geist_Mono, Montserrat, Dancing_Script, DM_Sans } from "next/font/google";
import "./globals.css";
import { validateOnStartup } from "@/lib/utils/env-validation";
import { Analytics } from "@vercel/analytics/next";
import { PerformanceOptimizer } from "@/components/utils";
import { TRPCProvider } from "@/components/sections";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL('https://thedebuthub.com'),
  title: "The Debut Hub - Discover Nigerian Music",
  description: "Explore trending music from Nigeria. Emerging artists and the latest hits you need to hear. The premier platform for discovering Nigerian talent.",
  
  // Open Graph meta tags for social sharing
  openGraph: {
    title: "The Debut Hub - Discover Nigerian Music",
    description: "Explore trending music from Nigeria. Emerging artists and the latest hits you need to hear. The premier platform for discovering Nigerian talent.",
    url: "https://thedebuthub.com",
    siteName: "The Debut Hub",
    images: [
      {
        url: "/images/The Debut Hub-black.png",  // Black background with white text for perfect visibility
        width: 1200,
        height: 630,
        alt: "The Debut Hub - Nigerian Music Discovery Platform",
      },
      {
        url: "/images/The Debut Hub.png",  // Fallback
        width: 636,
        height: 696,
        alt: "The Debut Hub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "The Debut Hub - Discover Nigerian Music",
    description: "Explore trending music from Nigeria. Emerging artists and the latest hits you need to hear.",
    images: ["/images/The Debut Hub-black.png"],  // Black background version for perfect visibility
    creator: "@thedebuthub",
    site: "@thedebuthub",
  },
  
  // Additional meta tags
  keywords: [
    "Nigerian music",
    "Afrobeats",
    "African music",
    "Emerging artists",
    "Music discovery",
    "Spotify charts",
    "Nigerian artists",
    "Afropop",
    "The Debut Hub"
  ],
  
  // Favicon and icons
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png?v=3", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png?v=3",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon", 
        url: "/android-chrome-512x512.png?v=3",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  
  // DNS verification is preferred - no HTML meta tags needed
  
  // Additional SEO enhancements
  alternates: {
    canonical: 'https://thedebuthub.com',
  },
  
  // Open Graph additional properties
  category: 'music',
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Validate environment on startup (server-side only)
if (typeof window === 'undefined') {
  try {
    validateOnStartup();
  } catch (error) {
    // Environment validation failed
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/tdh-logo.svg" as="image" />
        
        {/* Favicons - with cache busting */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=3" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        <link rel="manifest" href="/site.webmanifest?v=3" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#006dff" />
        <meta name="msapplication-TileColor" content="#006dff" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//i.scdn.co" />
        <link rel="dns-prefetch" href="//p.scdn.co" />
        
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Debut Hub",
              "alternateName": "TDH",
              "url": "https://thedebuthub.com",
              "description": "Explore trending music from Nigeria. Emerging artists and the latest hits you need to hear. The premier platform for discovering Nigerian talent.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://thedebuthub.com?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Debut Hub",
                "url": "https://thedebuthub.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thedebuthub.com/images/The%20Debut%20Hub-black.png"
              }
              },
              "sameAs": [
                "https://twitter.com/thedebuthub",
                "https://instagram.com/thedebuthub"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${dancingScript.variable} ${dmSans.variable} antialiased bg-slate-900`}
      >
        <PerformanceOptimizer />
        <TRPCProvider>
          {children}
        </TRPCProvider>
        <Analytics />
      </body>
    </html>
  );
}
