import './globals.css';
import constructMetadata from '@/lib/metadata';
import { hidayatullahFont, lateef, source_sans_3 } from '@/lib/fonts';
import LoadingProgressBar from '@/components/loading-progress-bar';
import { SettingsProvider } from '@/contexts/settings-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

export const metadata = constructMetadata({
  title: 'TDC Quran',
  description: 'Digital Quran platform by TDC Holdings',
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <head>
        <link rel="preload" href="/images/tdc-background-img.webp" as="image" />
      </head>
      <body
        className={`${source_sans_3.variable} ${hidayatullahFont.variable} ${lateef.variable} h-screen w-full font-source_sans_3 text-neutral-900`}
      >
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <LoadingProgressBar />
            <SettingsProvider>
              {children}
              <Toaster />
            </SettingsProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
