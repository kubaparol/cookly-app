export const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  'my-recipes': 'My Recipes',
  settings: 'Settings',
  edit: 'Edit Recipe',
  create: 'Create Recipe',
} as const;

export const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/').filter(Boolean);

  if (path.length === 0) return PAGE_TITLES.dashboard;

  const page = path[path.length - 1];
  return PAGE_TITLES[page] || page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ');
};
