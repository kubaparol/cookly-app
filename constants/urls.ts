export const ProjectUrls = Object.freeze({
  // landing page
  home: "/",

  // auth
  signIn: "/sign-in",
  signUp: "/sign-up",

  // app
  dashboard: "/dashboard",
  recipes: "/recipes",
  createRecipe: "/recipes/create",
});

export type ProjectUrlType = (typeof ProjectUrls)[keyof typeof ProjectUrls];
