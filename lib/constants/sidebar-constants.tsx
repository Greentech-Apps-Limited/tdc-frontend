import {
  ChoiceIcon,
  ChoiceIconFill,
  HomeIcon,
  HomeIconFill,
  ProfileIcon,
  ProfileIconFill,
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
    title: 'Profile',
    path: '/profile',
    icon: <ProfileIcon />,
    activeIcon: <ProfileIconFill />,
  },
];
