'use client';

import { SidebarHideIcon, SidebarShowIcon } from '@/icons';
import { SIDE_NAV_ITEMS } from '@/lib/constants/sidebar-constants';
import { Link, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useState, useCallback, useMemo, useEffect } from 'react';
import IconComponent from './ui/icon-component';
import SidebarBrandLogo from './sidebar-brand-logo';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { useTranslations } from 'next-intl';

const shouldSidebarBeMinimized = (pathname: string): boolean => {
  const pathsToMinimize: QuranSegment[] = ['surah', 'page', 'juz', 'hizb', 'ruku'];
  return pathsToMinimize.some(segment => pathname.includes(`/${segment}`));
};

const Sidebar = () => {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMinimized, setIsMinimized] = useState(shouldSidebarBeMinimized(pathname));

  useEffect(() => {
    setIsMinimized(shouldSidebarBeMinimized(pathname));
  }, [pathname]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prevState => !prevState);
  }, []);

  const isPathActive = useCallback(
    (path: string) => {
      const pathSegments = pathname.split('/').filter(Boolean);
      const itemPathSegments = path.split('/').filter(Boolean);

      return (
        pathSegments.slice(0).join('/') === itemPathSegments.join('/') ||
        pathSegments[0] === itemPathSegments[0]
      );
    },
    [pathname]
  );

  const getFilteredSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('verse');
    return params.toString();
  }, [searchParams]);

  console.log(searchParams);
  const navItems = useMemo(
    () =>
      SIDE_NAV_ITEMS.map(item => {
        const { icon, path, title, activeIcon } = item;
        const isActive = isPathActive(path);
        const filteredParams = getFilteredSearchParams();

        const href = filteredParams && path === '/' ? `${path}?${filteredParams}` : `${path}`;

        return (
          <Link key={path} href={href} aria-label={title}>
            <li
              data-test={`nav-item${path.replace(/\//g, '-')}`}
              className={`flex cursor-pointer gap-2 rounded-full hover:bg-neutral-200
                ${isActive ? 'bg-neutral-200' : ''}
                ${isMinimized ? 'p-3' : 'px-4 py-3'}
                transition-all duration-100 ease-in-out`}
            >
              <div>
                <IconComponent icon={isActive ? activeIcon : icon} className="text-2xl" />
              </div>
              <p
                className={`${isMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                ${isActive ? 'font-semibold' : ''}
                overflow-hidden whitespace-nowrap transition-all duration-150 ease-in-out`}
              >
                {t(title)}
              </p>
            </li>
          </Link>
        );
      }),
    [isMinimized, isPathActive, getFilteredSearchParams, t]
  );

  const sidebarContent = (
    <div
      className={`${isMinimized ? 'w-[80px]' : 'w-[276px]'} 
      flex h-full flex-col border-r border-neutral-200 bg-neutral 
      shadow transition-all duration-300 ease-in-out`}
    >
      <SidebarBrandLogo isMinimized={isMinimized} />
      <nav className="h-full w-full overflow-y-auto overflow-x-hidden p-4">
        <ul className="flex w-full flex-col gap-2">{navItems}</ul>
      </nav>
      <div className="p-4">
        <button
          data-test="toggle-minimize"
          onClick={toggleMinimize}
          type="button"
          className="flex w-full gap-2 rounded-full px-3 py-3 hover:bg-neutral-200"
          aria-label={isMinimized ? 'Expand Sidebar' : 'Minimize Sidebar'}
        >
          <div>
            {isMinimized ? (
              <SidebarShowIcon className="text-2xl" />
            ) : (
              <SidebarHideIcon className="text-2xl" />
            )}
          </div>
          <p
            className={`${isMinimized ? 'scale-0' : 'scale-100'} 
              transform transition-all duration-150 ease-in-out`}
          >
            {t('Minimize')}
          </p>
        </button>
      </div>
    </div>
  );

  return (
    <aside
      className="group/sidebar relative hidden sm:flex"
      data-state={isMinimized ? 'collapsed' : 'expanded'}
    >
      <div className="relative z-10 h-svh bg-transparent">{sidebarContent}</div>

      <div className="fixed inset-y-0 left-0 z-10 flex h-svh flex-col overflow-hidden">
        {sidebarContent}
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
  );
};

export default Sidebar;
