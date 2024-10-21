import AudioPlayerWrapper from '@/components/audio-player/audio-player-wrapper';
import Header from '@/components/header';
import { SettingsChecker } from '@/components/settings/settings-checker';
import Sidebar from '@/components/sidebar';
import HeaderSkeleton from '@/components/skeleton-loaders/header-skeleton';
import SidebarSkeleton from '@/components/skeleton-loaders/sidebar-skeleton';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

const HomeLayout = ({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) => {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Suspense>
        <SettingsChecker />
      </Suspense>
      <section className="flex h-full w-full">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <div className="flex h-full w-full flex-col">
          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>
          <div className="relative h-full w-full flex-1 overflow-hidden">
            {children}
            <div className="fixed bottom-0 right-0 z-10">
              <AudioPlayerWrapper />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeLayout;
