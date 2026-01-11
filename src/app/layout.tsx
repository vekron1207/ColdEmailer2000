import { Providers } from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automated Email Sender',
  description: 'Send emails at scale with dark mode, mobile support, and secure authentication',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
