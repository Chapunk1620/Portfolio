import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

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
    <html lang="en" className="scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
