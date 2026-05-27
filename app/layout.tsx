import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'CocoBongo - Premium Nightlife & Events',
  description: 'Experience luxury nightlife at CocoBongo. Reserve tables, book events, and join the most exclusive entertainment destination.',
  keywords: 'nightlife, events, reservations, VIP, entertainment, club',
  openGraph: {
    title: 'CocoBongo - Premium Nightlife & Events',
    description: 'Experience luxury nightlife at CocoBongo',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-dark-bg text-white">
        {children}
      </body>
    </html>
  );
}
