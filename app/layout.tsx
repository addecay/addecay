import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Addecay — Content Intelligence Platform',
  description: 'Monitor, analyze, and revive your content before it decays. Stay ahead of content freshness with AI-powered insights.',
  metadataBase: new URL('https://addecay.app'),
  openGraph: {
    title: 'Addecay',
    description: 'Monitor, analyze, and revive your content before it decays.',
    url: 'https://addecay.app',
    siteName: 'Addecay',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Addecay',
    description: 'Monitor, analyze, and revive your content before it decays.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
