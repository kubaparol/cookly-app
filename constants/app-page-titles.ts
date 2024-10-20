import { ProjectUrlType, ProjectUrls } from './urls';

export const appPageTitles: Partial<Record<ProjectUrlType, string>> = {
  [ProjectUrls.dashboard]: 'Dashboard',
  [ProjectUrls.recipes]: 'Recipes',
  [ProjectUrls.createRecipe]: 'Create Recipe',
};
