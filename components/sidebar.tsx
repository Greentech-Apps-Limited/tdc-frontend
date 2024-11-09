'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { SidebarContent } from './sidebar-content';

const shouldSidebarBeMinimized = (pathname: string): boolean => {
  const pathsToMinimize: QuranSegment[] = ['surah', 'page', 'juz', 'hizb', 'ruku'];
  return pathsToMinimize.some(segment => pathname.includes(`/${segment}`));
};

const Sidebar = () => {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(shouldSidebarBeMinimized(pathname));

  useEffect(() => {
    setIsMinimized(shouldSidebarBeMinimized(pathname));
  }, [pathname]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prevState => !prevState);
  }, []);

  return (
    <>
      <aside
        className="group/sidebar relative hidden sm:flex"
        data-state={isMinimized ? 'collapsed' : 'expanded'}
      >
        <div
          className={`${isMinimized ? 'w-[80px]' : 'w-[276px]'} relative z-10 h-svh bg-transparent transition-all duration-300 ease-in-out`}
        />
        <div className="fixed inset-y-0 left-0 z-10 flex h-svh flex-col overflow-hidden">
          <SidebarContent isMinimized={isMinimized} onToggleMinimize={toggleMinimize} />
        </div>
        <button
          className="absolute inset-y-0 -right-px z-20 hidden w-[3px] cursor-w-resize transition-all 
            after:absolute after:-inset-x-1.5 after:inset-y-0 after:opacity-20 
            hover:bg-gray-300 sm:flex"
          onClick={toggleMinimize}
          aria-label="Toggle Sidebar"
          tabIndex={-1}
          title="Toggle Sidebar"
        />
      </aside>
    </>
  );
};

export default Sidebar;
