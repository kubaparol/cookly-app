export const ProjectUrls = Object.freeze({
  // landing page
  home: '/',

  // auth
  signIn: '/sign-in',
  signUp: '/sign-up',

  // app
  dashboard: '/dashboard',
  myRecipes: '/my-recipes',
  createRecipe: '/my-recipes/create',
  editRecipe: (id: string) => `/my-recipes/${id}/edit`,
});
