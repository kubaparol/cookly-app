import {
  HelpCircleIcon,
  LayoutDashboardIcon,
  LucideIcon,
  ScrollText,
  SearchIcon,
  SettingsIcon,
} from 'lucide-react';
import { useMemo } from 'react';

import { ProjectUrls } from '@/constants/urls';

export interface AppSidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const useAppSidebarItems = () => {
  const main = useMemo<AppSidebarItem[]>(
    () => [
      {
        title: 'Dashboard',
        url: ProjectUrls.dashboard,
        icon: LayoutDashboardIcon,
      },
      {
        title: 'My Recipes',
        url: ProjectUrls.myRecipes,
        icon: ScrollText,
      },
    ],
    [],
  );

  const secondary = useMemo<AppSidebarItem[]>(
    () => [
      {
        title: 'Settings',
        url: ProjectUrls.settings,
        icon: SettingsIcon,
      },
      {
        title: 'Get Help',
        url: '#',
        icon: HelpCircleIcon,
      },
      {
        title: 'Search',
        url: '#',
        icon: SearchIcon,
      },
    ],
    [],
  );

  return { main, secondary };
};
