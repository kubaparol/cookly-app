import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getOneRecipe } from '@/db';

import RecipeView from '@/components/modules/recipes/RecipeView';
import { RecipeViewSkeleton } from '@/components/shared/skeletons';

async function RecipePageLoader({ id }: { id: string }) {
  const [recipe, user] = await Promise.all([getOneRecipe(id), currentUser()]);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="wrapper">
      <RecipeView {...recipe} isLoggedIn={!!user} />
    </div>
  );
}

export default function RecipePage({ id }: { id: string }) {
  return (
    <Suspense fallback={<RecipeViewSkeleton />}>
      <RecipePageLoader id={id} />
    </Suspense>
  );
}
