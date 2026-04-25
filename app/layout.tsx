import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Addecay — AI Video Ad Studio",
  description:
    "Create stunning 60-second video ads with AI. Script, generate, dub, and publish in minutes.",
  openGraph: {
    title: "Addecay — AI Video Ad Studio",
    description:
      "Script, generate, dub, and publish high-converting video ads in minutes.",
    url: "https://addecay.app",
    siteName: "Addecay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#08080a", color: "#e2e2e2" }}
      >
        {children}
      </body>
    </html>
  );
}
