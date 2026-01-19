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
    template: "%s | ReviewX",
    default: "ReviewX",
  },
  description:
    "ReviewX helps your business earn trust, build credibility, and be found by the right people through powerful online reviews.",
  keywords: [
    "ReviewX",
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
    title: "ReviewX – Be Found by the Right People",
    description:
      "Your business deserves trust. ReviewX helps you grow your online reputation and attract the right customers.",
    card: "summary_large_image",
    site: "@ReviewX",
    creator: "@ReviewX",
    images: {
      url: "/favicon/android-chrome-192x192.png",
      alt: "ReviewX",
    },
  },
  openGraph: {
    title: "ReviewX – Be Found by the Right People",
    description:
      "ReviewX helps you earn trust and grow your online reputation so the right customers find your business.",
    url: "https://reviewx.ai",
    siteName: "ReviewX",
    images: [
      {
        url: "/favicon/android-chrome-192x192.png",
        alt: "ReviewX",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://reviewx.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://reviewx.ai"),
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
