'use client';

import { SidebarHideIcon, SidebarShowIcon } from '@/icons';
import { SIDE_NAV_ITEMS } from '@/lib/constants/sidebar-constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import IconComponent from './ui/icon-component';
import SidebarBrandLogo from './sidebar-brand-logo';

const Sidebar = () => {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prevState => !prevState);
  }, []);

  const isPathActive = useCallback(
    (path: string) => {
      const pathSegments = path.split('/').filter(Boolean);
      const pathnameSegments = pathname.split('/').filter(Boolean);

      return pathname === path || pathnameSegments[0] === pathSegments[0];
    },
    [pathname]
  );
  const navItems = useMemo(
    () =>
      SIDE_NAV_ITEMS.map(item => {
        const { icon, path, title, activeIcon } = item;
        const isActive = isPathActive(path);

        return (
          <Link key={path} href={path} aria-label={title}>
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
                className={`${isMinimized ? 'scale-0' : 'scale-100'} 
              ${isActive ? 'font-semibold' : ''} 
              transform transition-all duration-150 ease-in-out`}
              >
                {title}
              </p>
            </li>
          </Link>
        );
      }),
    [isMinimized, isPathActive]
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
            Minimize
          </p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
