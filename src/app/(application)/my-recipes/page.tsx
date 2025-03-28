import { Metadata } from 'next';
import { Suspense } from 'react';

import Search from '@/components/base/Search';
import Filters from '@/components/containers/Filters';
import MyRecipesContainer from '@/components/containers/MyRecipesContainer';
import { MyRecipesSkeleton } from '@/components/shared/skeletons';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'My Recipes',
};

export default async function RecipesPage(props: PageProps) {
  const { searchParams } = props;

  const difficultyParam = searchParams.difficulty
    ? (searchParams.difficulty as string).split('_')
    : [];
  const cuisineTypeParam = searchParams.cuisineType
    ? (searchParams.cuisineType as string).split('_')
    : [];
  const mealTypeParam = searchParams.mealType ? (searchParams.mealType as string).split('_') : [];
  const dietaryTagsParam = searchParams.dietaryTags
    ? (searchParams.dietaryTags as string).split('_')
    : [];
  const maxCookingTimeParam = searchParams.maxCookingTime as string | undefined;

  return (
    <section className="flex h-full flex-1 flex-col gap-6 pb-8">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-[400px]">
            <Search placeholder="Search recipes..." />
          </div>

          <Filters />
        </div>
      </div>

      <Suspense fallback={<MyRecipesSkeleton />}>
        <MyRecipesContainer
          query={searchParams.query as string}
          difficulty={difficultyParam}
          cuisineType={cuisineTypeParam}
          mealType={mealTypeParam}
          dietaryTags={dietaryTagsParam}
          maxCookingTime={maxCookingTimeParam}
        />
      </Suspense>
    </section>
  );
}
