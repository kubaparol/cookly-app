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
      {
        label: 'Meal Planner',
        url: ProjectUrls.home,
      },
      {
        label: 'Community',
        url: ProjectUrls.home,
      },
    ],
    [],
  );

  const supportLinks = useMemo<NavLinkEntity[]>(
    () => [
      {
        label: 'FAQ',
        url: ProjectUrls.home,
      },
      {
        label: 'Contact Us',
        url: ProjectUrls.home,
      },
      {
        label: 'Terms & Conditions',
        url: ProjectUrls.home,
      },
      {
        label: 'Privacy Policy',
        url: ProjectUrls.home,
      },
    ],
    [],
  );

  return { quickLinks, supportLinks };
};
