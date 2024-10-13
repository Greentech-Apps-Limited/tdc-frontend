import { unstable_setRequestLocale } from 'next-intl/server';
const QuranicQuizPlayModeLayout = ({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) => {
  unstable_setRequestLocale(locale);

  return <section className="h-screen w-screen">{children}</section>;
};

export default QuranicQuizPlayModeLayout;
