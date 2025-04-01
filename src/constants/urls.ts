export const ProjectUrls = Object.freeze({
  // landing page
  home: '/',
  recipes: '/recipes',
  recipe: (id: string) => `/recipe/${id}`,

  // auth
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',

  // app
  dashboard: '/dashboard',
  myRecipes: '/my-recipes',
  favoriteRecipes: '/favorite-recipes',
  comments: '/comments',
  createRecipe: '/my-recipe/create',
  editRecipe: (id: string) => `/my-recipe/${id}/edit`,
  settings: '/settings',
});

export const ExternalUrls = Object.freeze({});
