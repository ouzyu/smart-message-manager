import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Smart Message Manager',
    template: '%s | Smart Message Manager',
  },
  description: '効率的なメッセージ管理システム - Murakami Hiroki Portfolio',
  keywords: ['メッセージ管理', 'ダッシュボード', 'コミュニケーション', 'ポートフォリオ'],
  authors: [{ name: 'Murakami Hiroki' }],
  creator: 'Murakami Hiroki',
  publisher: 'Murakami Hiroki',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'Smart Message Manager',
    description: '効率的なメッセージ管理システム',
    siteName: 'Smart Message Manager',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Message Manager',
    description: '効率的なメッセージ管理システム',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
