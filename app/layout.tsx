import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/index.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pi Tech — Software consultancy · Kigali',
  description:
    'Pi Tech Ltd. delivers custom software, cloud solutions, and technical advisory for companies in Rwanda and beyond.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
