import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getOneRecipe } from '@/db';

import RecipeView from '@/components/modules/recipes/RecipeView';
import { RecipeViewSkeleton } from '@/components/shared/skeletons';

async function RecipePageLoader({ id }: { id: string }) {
  const recipe = await getOneRecipe(id);

  if (!recipe) {
    notFound();
  }

  return <RecipeView {...recipe} />;
}

export default function RecipePage({ id }: { id: string }) {
  return (
    <Suspense fallback={<RecipeViewSkeleton />}>
      <RecipePageLoader id={id} />
    </Suspense>
  );
}
