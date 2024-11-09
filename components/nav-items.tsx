import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import IconComponent from './ui/icon-component';
import { SIDE_NAV_ITEMS } from '@/lib/constants/sidebar-constants';

interface NavItemsProps {
  isMinimized?: boolean;
  className?: string;
  onItemClick?: () => void;
}

export const NavItems = ({ isMinimized = false, className = '', onItemClick }: NavItemsProps) => {
  const t = useTranslations('sidebar');
  const pathname = usePathname();

  const isPathActive = (path: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const itemPathSegments = path.split('/').filter(Boolean);

    return (
      pathSegments.slice(0).join('/') === itemPathSegments.join('/') ||
      pathSegments[0] === itemPathSegments[0]
    );
  };

  return (
    <ul className={`flex w-full flex-col gap-2 ${className}`}>
      {SIDE_NAV_ITEMS.map(({ icon, path, title, activeIcon }) => {
        const isActive = isPathActive(path);
        const href = `${path}`;

        return (
          <Link key={path} href={href} aria-label={title} onClick={onItemClick}>
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
      })}
    </ul>
  );
};
