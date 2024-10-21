import { useMemo } from 'react';

import { ProjectUrls } from '@/constants/urls';

export interface NavLinkEntity {
  label: string;
  url: string;
}

export const useNavLinks = () => {
  const links = useMemo<NavLinkEntity[]>(
    () => [
      {
        label: 'Recipes',
        url: ProjectUrls.recipes,
      },
    ],
    [],
  );

  return { links };
};
