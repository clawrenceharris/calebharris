import type { Metadata } from "next";
import "./globals.css";
import { MenuProvider, QueryProvider } from "@/app/providers";
import { Lexend, Red_Hat_Mono } from "next/font/google";
import { Tabs } from "@/components";

export const metadata: Metadata = {
  title: "Caleb Harris",
  description: "Caleb's, computer science portfolio website",
};

export const lexendGiga = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-mono",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-primary h-dvh bg-background overflow-hidden text-foreground p-6 pt-15 md:pt-6 ${lexendGiga.variable} ${redHatMono.variable}`}
      >
        <MenuProvider>
          <QueryProvider>{children}</QueryProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
