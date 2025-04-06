export const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  'my-recipes': 'My Recipes',
  settings: 'Settings',
  edit: 'Edit Recipe',
  create: 'Create Recipe',
  'favorite-recipes': 'Favorite Recipes',
  received: 'Comments Received',
  made: 'Comments Made',
} as const;

export const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/').filter(Boolean);

  if (path.length === 0) return PAGE_TITLES.dashboard;

  const lastSegment = path[path.length - 1];

  if (PAGE_TITLES[lastSegment]) return PAGE_TITLES[lastSegment];

  if (/^\d+$/.test(lastSegment) && path.length > 1) {
    const parentSegment = path[path.length - 2];
    if (PAGE_TITLES[parentSegment]) return PAGE_TITLES[parentSegment];
  }

  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
};
