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

      // Ignore the language prefix (first segment) when comparing
      return (
        pathSegments.slice(1).join('/') === itemPathSegments.join('/') ||
        pathSegments[1] === itemPathSegments[0]
      );
    },
    [pathname]
  );

  const getFilteredSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('verse');
    return params.toString();
  }, [searchParams]);

  const navItems = useMemo(
    () =>
      SIDE_NAV_ITEMS.map(item => {
        const { icon, path, title, activeIcon } = item;
        const isActive = isPathActive(path);
        const filteredParams = getFilteredSearchParams();
        const langPrefix = pathname.split('/')[1]; // Get the language prefix

        const href =
          filteredParams && path === '/'
            ? `/${langPrefix}${path}?${filteredParams}`
            : `/${langPrefix}${path}`;

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
    [isMinimized, isPathActive, getFilteredSearchParams, pathname, t]
  );

  return (
    <aside
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
    </aside>
  );
};

export default Sidebar;
