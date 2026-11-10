import type { Metadata, Viewport } from "next";
import "@vendor/threeui/threeui.css";
import "./globals.css";

const SITE = "https://abhinavsingh.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Abhinav Singh — Building Intelligent Experiences",
    template: "%s · Abhinav Singh",
  },
  description:
    "Abhinav Singh is a Computer Science Engineering student and aspiring AI engineer in Kanpur, India. He builds products: Vednix AI, a live multi-provider AI workspace, and Second Thought, an in-development requirement layer for AI.",
  applicationName: "Abhinav Singh",
  authors: [{ name: "Abhinav Singh", url: "https://github.com/abhinavsinghparihar" }],
  creator: "Abhinav Singh",
  keywords: [
    "Abhinav Singh",
    "AI engineer",
    "computer science engineering student",
    "Kanpur",
    "full-stack developer",
    "Vednix AI",
    "Second Thought",
    "Next.js portfolio",
    "Three.js portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Abhinav Singh",
    title: "Abhinav Singh — Building Intelligent Experiences",
    description:
      "Computer Science Engineering student and aspiring AI engineer. Vednix AI is live; Second Thought is being built. A night walk through both, rendered in WebGL.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Abhinav Singh — Building Intelligent Experiences. Engineering what's next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Singh — Building Intelligent Experiences",
    description:
      "Computer Science Engineering student and aspiring AI engineer in Kanpur. Vednix AI is live; Second Thought is in build.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
