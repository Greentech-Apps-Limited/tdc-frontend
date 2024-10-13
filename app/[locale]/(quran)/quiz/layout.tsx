import { unstable_setRequestLocale } from 'next-intl/server';

const QuranicQuizLayout = ({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) => {
  unstable_setRequestLocale(locale);
  return (
    <section className="h-full w-full overflow-y-scroll">
      <div className="m-6 max-w-8xl">{children}</div>
    </section>
  );
};

export default QuranicQuizLayout;
