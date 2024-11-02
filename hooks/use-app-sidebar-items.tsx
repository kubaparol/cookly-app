import { Home, LucideProps, ScrollText, Settings } from 'lucide-react';
import { ComponentType, useMemo } from 'react';

import { ProjectUrls } from '@/constants/urls';

export interface SidebarItemEntity {
  label: string;
  url?: string;
  onClick?: () => void;
  icon: ComponentType<LucideProps>;
}

export const useAppSidebarItems = () => {
  const topItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: 'Dashboard',
        url: ProjectUrls.dashboard,
        icon: Home,
      },
      {
        label: 'My Recipes',
        url: ProjectUrls.myRecipes,
        icon: ScrollText,
      },
    ],
    [],
  );

  const bottomItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: 'Settings',
        url: ProjectUrls.settings,
        icon: Settings,
      },
    ],
    [],
  );
  return { topItems, bottomItems };
};
