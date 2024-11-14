import { SidebarHideIcon, SidebarShowIcon } from '@/icons';
import SidebarBrandLogo from './sidebar-brand-logo';
import { useTranslations } from 'next-intl';
import { NavItems } from './nav-items';

interface SidebarContentProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const SidebarContent = ({ isMinimized, onToggleMinimize }: SidebarContentProps) => {
  const t = useTranslations('sidebar');

  return (
    <div
      className={`${isMinimized ? 'w-[80px]' : 'w-[276px]'} 
      flex h-full flex-col border-r border-neutral-200 bg-neutral 
      shadow transition-all duration-300 ease-in-out`}
    >
      <SidebarBrandLogo isMinimized={isMinimized} />
      <nav className="h-full w-full overflow-y-auto overflow-x-hidden p-4">
        <NavItems isMinimized={isMinimized} />
      </nav>
      <div className="p-4">
        <button
          data-test="toggle-minimize"
          onClick={onToggleMinimize}
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
};
