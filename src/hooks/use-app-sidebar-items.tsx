import {
  Heart,
  LayoutDashboardIcon,
  LucideIcon,
  MessageCircle,
  ScrollText,
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
      {
        title: 'Favorite Recipes',
        url: ProjectUrls.favoriteRecipes,
        icon: Heart,
      },
      {
        title: 'Comments',
        url: ProjectUrls.comments,
        icon: MessageCircle,
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
    ],
    [],
  );

  return { main, secondary };
};
