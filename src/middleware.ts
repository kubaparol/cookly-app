import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { ProjectUrls } from '@/constants';

const isPublicRoute = createRouteMatcher([
  // project routes
  `${ProjectUrls.home}`,
  `${ProjectUrls.signIn}(.*)`,
  `${ProjectUrls.signUp}(.*)`,
  `${ProjectUrls.forgotPassword}(.*)`,
  `${ProjectUrls.recipes}(.*)`,
  `${ProjectUrls.recipe(':id')}(.*)`,

  // api routes
  '/api/uploadthing',
  '/api/webhook/clerk',
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
