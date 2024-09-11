import AudioPlayerWrapper from '@/components/audio-player/audio-player-wrapper';
import Header from '@/components/header';
import { SettingsChecker } from '@/components/settings/settings-checker';
import Sidebar from '@/components/sidebar';
import { Suspense } from 'react';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Suspense>
      <SettingsChecker>
        <section className="flex h-full w-full">
          <Sidebar />
          <div className="flex h-full w-full flex-col">
            <Header />
            <div className="relative h-full w-full flex-1 overflow-hidden">
              {children}
              <div className="fixed bottom-0 right-0 z-10 m-6">
                <AudioPlayerWrapper />
              </div>
            </div>
          </div>
        </section>
      </SettingsChecker>
    </Suspense>
  );
};

export default HomeLayout;
