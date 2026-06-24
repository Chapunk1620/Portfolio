import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import SkipToContent from "@/components/SkipToContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chapunk1620.github.io"),
  title: "Jhon Christian Solano | Full-Stack Developer",
  description:
    "Results-driven full stack developer building scalable web applications with React, Next.js, Node.js, and Laravel.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Jhon Christian Solano | Full-Stack Developer",
    description:
      "Results-driven full stack developer building scalable web applications.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jhon Christian Solano",
  jobTitle: "Full-Stack Developer",
  url: "https://github.com/Chapunk1620",
  email: "jhonchristiansolano@gmail.com",
  knowsAbout: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Laravel", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}})()`
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SkipToContent />
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          <main id="main-content">{children}</main>
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
