import type { Metadata } from "next";
import { Alexandria, Manrope } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import HydrationMark from "@/components/HydrationMark";
import ScrollEffects from "@/components/ScrollEffects";
import { LocaleProvider } from "@/i18n/LocaleProvider";

// Arabic site: right-to-left, set in Alexandria (headlines and body). Manrope
// stays loaded for Latin bits such as the "English" switch.
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "حسن علام العقارية — فئات أصول مصممة لأنماط حياة المستقبل",
  description:
    "تقدم حسن علام العقارية محفظة من المشروعات السكنية والتجارية والفندقية ومتعددة الاستخدامات في أنحاء مصر، مصممة لأنماط حياة المستقبل.",
};

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${manrope.variable} antialiased`}>
      <body>
        <LocaleProvider locale="ar">
          <HydrationMark />
          <ScrollEffects />
          <Navbar />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
