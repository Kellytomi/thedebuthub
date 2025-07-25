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
