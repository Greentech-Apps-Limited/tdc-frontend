import StatisticsPanel from '@/components/profile/statistics-panel';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const ProfilePage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Profile');
  return (
    <section className="h-full w-full space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-6">
      <h1 className="font-hidayatullah_demo text-3xl font-bold">{t('title')}</h1>
      <StatisticsPanel />
    </section>
  );
};

export default ProfilePage;
