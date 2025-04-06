import { ProjectUrls } from '@/constants/urls';

export interface NavLinkEntity {
  label: string;
  url: string;
}

export const useNavLinks = () => {
  const navLinks: NavLinkEntity[] = [
    {
      label: 'Home',
      url: ProjectUrls.home,
    },
    {
      label: 'Recipes',
      url: ProjectUrls.recipes,
    },
  ];

  const quickLinks: NavLinkEntity[] = [
    {
      label: 'Features',
      url: `${ProjectUrls.home}#features`,
    },
    {
      label: 'FAQ',
      url: `${ProjectUrls.home}#faq`,
    },
  ];

  return { navLinks, quickLinks };
};
