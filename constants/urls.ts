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
  updateRecipe: (id: string) => `/my-recipes/${id}/update`,
});

export type ProjectUrlType = Extract<(typeof ProjectUrls)[keyof typeof ProjectUrls], string>;
