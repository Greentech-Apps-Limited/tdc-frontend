import {
  ChoiceIcon,
  ChoiceIconFill,
  HomeIcon,
  HomeIconFill,
  ProfileIcon,
  ProfileIconFill,
  SettingsIcon,
  SettingsIconFill,
} from '@/icons';

export type SideNavItem = {
  title: string;
  path: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};
export const SIDE_NAV_ITEMS: SideNavItem[] = [
  {
    title: 'Homepage',
    path: '/',
    icon: <HomeIcon />,
    activeIcon: <HomeIconFill />,
  },
  {
    title: 'Quiz',
    path: '/quiz',
    icon: <ChoiceIcon />,
    activeIcon: <ChoiceIconFill />,
  },
  {
    title: 'Setting',
    path: '/settings',
    icon: <SettingsIcon />,
    activeIcon: <SettingsIconFill />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <ProfileIcon />,
    activeIcon: <ProfileIconFill />,
  },
];
