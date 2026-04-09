import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/provider/LenisProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEV_ARCHIVE_V1 | Digital Experience Through Code",
  description: "Full-stack Engineer & System Designer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${SpaceGrotesk.variable} antialiased`}>
      <body className="min-h-full">
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
