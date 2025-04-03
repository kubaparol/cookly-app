import {
  BarChart3,
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

export interface AppSidebarGroup {
  title: string;
  icon: LucideIcon;
  items: Omit<AppSidebarItem, 'icon'>[];
}

export const useAppSidebarItems = () => {
  const main = useMemo<(AppSidebarItem | AppSidebarGroup)[]>(
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
        title: 'Analytics',
        url: ProjectUrls.analytics,
        icon: BarChart3,
      },
      {
        title: 'Comments',
        icon: MessageCircle,
        items: [
          {
            title: 'Comments Received',
            url: ProjectUrls.commentsReceived,
          },
          {
            title: 'Comments Made',
            url: ProjectUrls.commentsMade,
          },
        ],
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
