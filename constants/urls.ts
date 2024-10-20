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
});

export type ProjectUrlType = (typeof ProjectUrls)[keyof typeof ProjectUrls];
