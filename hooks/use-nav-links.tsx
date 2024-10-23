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
        url: ProjectUrls.mealPlanner,
      },
      {
        label: 'Community',
        url: ProjectUrls.community,
      },
    ],
    [],
  );

  const supportLinks = useMemo<NavLinkEntity[]>(
    () => [
      {
        label: 'FAQ',
        url: ProjectUrls.faq,
      },
      {
        label: 'Contact Us',
        url: ProjectUrls.contactUs,
      },
      {
        label: 'Terms & Conditions',
        url: ProjectUrls.termsAndConditions,
      },
      {
        label: 'Privacy Policy',
        url: ProjectUrls.privacyPolicy,
      },
    ],
    [],
  );

  return { quickLinks, supportLinks };
};
