import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Qwirkle Scoreboard',
  description: 'Game scoring app for Qwirkle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
