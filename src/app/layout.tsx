import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import { BaseProvider } from "../providers/BaseProvider";
import { cn } from "../utils";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#111214",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Repprotector",
    default: "Repprotector",
  },
  description:
    "Repprotector helps your business earn trust, build credibility, and be found by the right people through powerful online reviews.",
  keywords: [
    "Repprotector",
    "online reviews",
    "reputation management",
    "business reviews",
    "customer trust",
    "review management platform",
    "local business growth",
    "online reputation",
    "review automation",
    "customer feedback",
    "brand credibility",
    "social proof",
  ],
  twitter: {
    title: "Repprotector – Be Found by the Right People",
    description:
      "Your business deserves trust. Repprotector helps you grow your online reputation and attract the right customers.",
    card: "summary_large_image",
    site: "@Repprotector",
    creator: "@Repprotector",
    images: {
      url: "/favicon/android-chrome-192x192.png",
      alt: "Repprotector",
    },
  },
  openGraph: {
    title: "Repprotector – Be Found by the Right People",
    description:
      "Repprotector helps you earn trust and grow your online reputation so the right customers find your business.",
    url: "https://repprotector.ai",
    siteName: "Repprotector",
    images: [
      {
        url: "/favicon/android-chrome-192x192.png",
        alt: "Repprotector",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://repprotector.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://repprotector.ai"),
};

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  display: "swap",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body
        className={cn(
          "overflow-hidden bg-background antialiased",
          nunitoSans.variable,
          playfair.variable
        )}
        suppressHydrationWarning
      >
        <BaseProvider>{children}</BaseProvider>
      </body>
    </html>
  );
}
