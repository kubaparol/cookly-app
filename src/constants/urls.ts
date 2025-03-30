export const ProjectUrls = Object.freeze({
  // landing page
  home: '/',
  recipes: '/recipes',
  recipe: (id: string) => `/recipe/${id}`,

  // auth
  signIn: '/sign-in',
  signUp: '/sign-up',

  // app
  dashboard: '/dashboard',
  myRecipes: '/my-recipes',
  createRecipe: '/my-recipes/create',
  editRecipe: (id: string) => `/my-recipes/${id}/edit`,
  settings: '/settings',
});

export const ExternalUrls = Object.freeze({});
