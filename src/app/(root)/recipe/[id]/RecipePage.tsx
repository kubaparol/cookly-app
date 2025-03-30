import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getOneRecipe } from '@/db';

import RecipeView from '@/components/modules/recipes/RecipeView';
import { RecipeViewSkeleton } from '@/components/shared/skeletons';

import { PageProps } from '@/types';

async function RecipePageLoader({ id }: { id: string }) {
  const recipe = await getOneRecipe(id);

  if (!recipe) {
    notFound();
  }

  return <RecipeView {...recipe} />;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const id = props.params?.id as string;

  const recipe = await getOneRecipe(id);

  if (!recipe) return {};

  return {
    title: recipe.title,
    description: recipe?.description,
    openGraph: {
      title: recipe.title,
      ...(recipe.description && { description: recipe.description }),
      images: [
        {
          url: recipe.imageUrl,
          width: 800,
          height: 600,
          alt: `${recipe.title} picture`,
        },
      ],
    },
  };
}

export default function RecipePage({ id }: { id: string }) {
  return (
    <Suspense fallback={<RecipeViewSkeleton />}>
      <RecipePageLoader id={id} />
    </Suspense>
  );
}
