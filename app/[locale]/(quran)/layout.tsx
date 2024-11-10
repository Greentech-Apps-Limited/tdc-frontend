import AudioPlayerWrapper from '@/components/audio-player/audio-player-wrapper';
import Header from '@/components/header';
import ScrollHeaderWrapper from '@/components/responsive-scroll-header';
import Sidebar from '@/components/sidebar';
import HeaderSkeleton from '@/components/skeleton-loaders/header-skeleton';
import { SidebarSkeleton } from '@/components/skeleton-loaders/sidebar-skeleton';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

const HomeLayout = ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  unstable_setRequestLocale(locale);
  return (
    <>
      <section className="relative flex h-full w-full flex-row">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <div className=" min-h-full flex-1">
          <div className="flex h-svh flex-col">
            <div className="z-0 mx-auto flex w-full flex-1 flex-col overflow-visible">
              <Suspense fallback={<HeaderSkeleton />}>
                <ScrollHeaderWrapper>
                  <Header />
                </ScrollHeaderWrapper>
              </Suspense>
              {children}
              <div className="fixed bottom-0 right-0 z-10">
                <AudioPlayerWrapper />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeLayout;
