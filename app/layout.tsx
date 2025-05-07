import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from "@clerk/localizations";
import { Geist, Geist_Mono } from "next/font/google";

import { ModalProvider } from "@/providers/modal-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider localization={trTR}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
