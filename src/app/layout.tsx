import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import HydrationMark from "@/components/HydrationMark";
import ScrollEffects from "@/components/ScrollEffects";
import { withBasePath } from "@/lib/basePath";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hassan Allam Properties — Asset Classes Designed for Future Lifestyles",
  description:
    "Hassan Allam Properties delivers a nationwide portfolio of residential, commercial, hospitality and mixed-use developments designed for future lifestyles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} antialiased`}
    >
      <head>
        {/* Eirlys Light (display serif) — the vendor's stylesheet, unaltered,
            so its license header stays visible. */}
        <link rel="stylesheet" href={withBasePath("/fonts/eirlys/eirlys-light.css")} />
        <link
          rel="preload"
          href={withBasePath("/fonts/eirlys/eirlys-light.woff2")}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <HydrationMark />
        <ScrollEffects />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
