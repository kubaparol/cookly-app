import { useMemo } from 'react';

import { ProjectUrls } from '@/constants/urls';

export interface NavLinkEntity {
  label: string;
  url: string;
}

export const useNavLinks = () => {
  const quickLinks = useMemo<NavLinkEntity[]>(
    () => [
      {
        label: 'Home',
        url: ProjectUrls.home,
      },
      {
        label: 'Recipes',
        url: ProjectUrls.recipes,
      },
    ],
    [],
  );

  return { quickLinks };
};
