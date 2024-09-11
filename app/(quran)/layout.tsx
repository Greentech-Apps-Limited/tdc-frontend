import AudioPlayer from '@/components/audio-player/audio-player';
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
            <div className="relative h-full w-full flex-1 overflow-y-scroll">
              {children}
              <div className="fixed bottom-0 right-0 z-10 m-6">
                <AudioPlayer audioUrl="https://download.quranicaudio.com/qdc/abdurrahmaan_as_sudais/murattal/49.mp3" />
              </div>
            </div>
          </div>
        </section>
      </SettingsChecker>
    </Suspense>
  );
};

export default HomeLayout;
