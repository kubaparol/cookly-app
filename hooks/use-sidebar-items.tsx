import { useClerk } from '@clerk/nextjs';
import { Home, LucideProps, PowerIcon, ScrollText } from 'lucide-react';
import { ComponentType, useMemo } from 'react';

import { ProjectUrls } from '@/constants/urls';

export interface SidebarItemEntity {
  label: string;
  url?: string;
  onClick?: () => void;
  icon?: ComponentType<LucideProps>;
}

export const useSidebarItems = () => {
  const { signOut } = useClerk();

  const appTopItems = useMemo<SidebarItemEntity[]>(
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

  const appBottomItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: 'Sign Out',
        onClick: () => signOut({ redirectUrl: ProjectUrls.home }),
        icon: PowerIcon,
      },
    ],
    [],
  );

  const homeItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: 'Recipes',
        url: ProjectUrls.recipes,
      },
    ],
    [],
  );

  return { appTopItems, appBottomItems, homeItems };
};
