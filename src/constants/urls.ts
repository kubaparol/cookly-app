export const ProjectUrls = Object.freeze({
  // landing page
  home: '/',
  recipes: '/recipes',
  recipe: (id: string) => `/recipe/${id}`,

  // legals
  termsOfService: '/legals/terms-of-service',
  privacyPolicy: '/legals/privacy-policy',
  cookiePolicy: '/legals/cookie-policy',

  // auth
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',

  // app
  dashboard: '/dashboard',
  myRecipes: '/my-recipes',
  favoriteRecipes: '/favorite-recipes',
  commentsMade: '/comments/made',
  commentsReceived: '/comments/received',
  createRecipe: '/my-recipe/create',
  editRecipe: (id: string) => `/my-recipe/${id}/edit`,
  analytics: '/analytics',
  settings: '/settings',
});

export const ExternalUrls = Object.freeze({
  facebook: 'https://www.facebook.com',
  twitter: 'https://www.twitter.com',
  instagram: 'https://www.instagram.com',
  github: 'https://www.github.com',
});
