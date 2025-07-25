import { Geist, Geist_Mono, Montserrat, Dancing_Script, DM_Sans } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "./contexts/AudioContext";
import YouTubeBackgroundPlayer from "./components/YouTubeBackgroundPlayer";
import { validateOnStartup } from "../lib/env-validation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "The Debut Hub - Discover Nigerian Music",
  description: "Explore trending music from Nigeria. Emerging artists and the latest hits you need to hear. The premier platform for discovering Nigerian talent.",
  
  // Open Graph meta tags for social sharing
  openGraph: {
    title: "The Debut Hub - Discover Nigerian Music",
    description: "Explore trending music from Nigeria. Emerging artists and the latest hits you need to hear. The premier platform for discovering Nigerian talent.",
    url: "https://thedebuthub.vercel.app",
    siteName: "The Debut Hub",
    images: [
      {
        url: "/images/The Debut Hub.png",
        width: 1200,
        height: 630,
        alt: "The Debut Hub - Nigerian Music Discovery Platform",
      },
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
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
    images: ["/images/The Debut Hub.png"],
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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512", 
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  
  // Verification and additional meta
  verification: {
    // Add your verification codes here when you get them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  
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

// Validate environment on startup
if (typeof window === 'undefined') {
  try {
    validateOnStartup();
  } catch (error) {
    console.error('Environment validation failed:', error.message);
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#006dff" />
        <meta name="msapplication-TileColor" content="#006dff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${dancingScript.variable} ${dmSans.variable} antialiased bg-slate-900`}
      >
        <AudioProvider>
          <YouTubeBackgroundPlayer />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
