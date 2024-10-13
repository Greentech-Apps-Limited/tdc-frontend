import './globals.css';
import type { Metadata } from 'next';
import { hidayatullahFont, lateef, source_sans_3 } from '@/lib/fonts';
import LoadingProgressBar from '@/components/loading-progress-bar';
import { SettingsProvider } from '@/contexts/settings-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Quran',
  description: 'Generated by Greentech apps limited',
};

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
        <NextIntlClientProvider messages={messages}>
          <LoadingProgressBar />
          <SettingsProvider>{children}</SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}