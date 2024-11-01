export const ProjectUrls = Object.freeze({
  // landing page
  home: '/',
  recipes: '/recipes',
  recipe: (id: string) => `/recipes/${id}`,
  mealPlanner: '/meal-planner',
  community: '/community',
  faq: '/faq',
  contactUs: '/contact-us',
  termsAndConditions: '/legals/terms-and-conditions',
  privacyPolicy: '/legals/privacy-policy',

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

export const ExternalUrls = Object.freeze({
  facebook: 'https://www.facebook.com/',
  x: 'https://x.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/',
});
