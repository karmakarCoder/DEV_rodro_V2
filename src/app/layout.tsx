import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/provider/LenisProvider";
import TranstackProvider from "@/provider/TranstackProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("antialiased", SpaceGrotesk.variable, "font-sans", geist.variable)}>
      <body className="min-h-full">
        <LenisProvider>
          <TranstackProvider>{children}</TranstackProvider>{" "}
        </LenisProvider>
      </body>
    </html>
  );
}
