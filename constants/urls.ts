export const ProjectUrls = Object.freeze({
  // landing page
  home: '/',
  recipes: '/recipes',
  recipe: (id: string) => `/recipes/${id}`,

  // auth
  signIn: '/sign-in',
  signUp: '/sign-up',

  // app
  dashboard: '/dashboard',
  myRecipes: '/my-recipes',
  createRecipe: '/my-recipes/create',
  editRecipe: (id: string) => `/my-recipes/${id}/edit`,
});

export const ExternalUrls = Object.freeze({
  facebook: 'https://www.facebook.com/',
  x: 'https://x.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/',
});
