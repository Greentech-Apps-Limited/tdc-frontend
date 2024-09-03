import Header from '@/components/header';
import { SettingsChecker } from '@/components/settings/settings-checker';
import Sidebar from '@/components/sidebar';
import { TimeSpentProvider } from '@/contexts/time-spent-context';
import { Suspense } from 'react';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Suspense>
      <TimeSpentProvider>
        <SettingsChecker>
          <section className="flex h-full w-full">
            <Sidebar />
            <div className="flex h-full w-full flex-col">
              <Header />
              <div className="h-full w-full flex-1 overflow-y-scroll">{children}</div>
            </div>
          </section>
        </SettingsChecker>
      </TimeSpentProvider>
    </Suspense>
  );
};

export default HomeLayout;
