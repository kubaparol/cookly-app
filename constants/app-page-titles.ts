import { ProjectUrlType, ProjectUrls } from './urls';

export const appPageTitles: Partial<Record<ProjectUrlType, string>> = {
  [ProjectUrls.dashboard]: 'Dashboard',
  [ProjectUrls.myRecipes]: 'My Recipes',
  [ProjectUrls.createRecipe]: 'Create Recipe',
};
