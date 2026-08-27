import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.shortName}`,
  },
  description: "Photography, videography, wedding coverage, portraits, and creative media production.",
  icons: {
    icon: "/images/logo.PNG",
    shortcut: "/images/logo.PNG",
    apple: "/images/logo.PNG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
