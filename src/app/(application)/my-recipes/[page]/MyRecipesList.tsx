import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { useRecipeSearchParams } from '@/hooks';

import { calculateOffset } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { getMyRecipes } from '@/db';

import { UserRecipesTable } from '@/components/modules/recipes/UserRecipesTable';
import { RecipesSkeleton } from '@/components/shared/skeletons';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

import { PageProps } from '@/types';

async function MyRecipesLoader(props: PageProps) {
  const { params, searchParams } = props;

  const page = Number(params?.page);
  const offset = calculateOffset(page, DATA_PER_PAGE);

  const {
    difficultyParam,
    cuisineTypeParam,
    mealTypeParam,
    dietaryTagsParam,
    maxCookingTimeParam,
    queryParam,
  } = useRecipeSearchParams(searchParams);

  const [user, recipes] = await Promise.all([
    currentUser(),
    getMyRecipes({
      query: queryParam,
      difficulty: difficultyParam,
      cuisineType: cuisineTypeParam,
      mealType: mealTypeParam,
      dietaryTags: dietaryTagsParam,
      maxCookingTime: maxCookingTimeParam,
      limit: DATA_PER_PAGE,
      offset,
    }),
  ]);

  if (!user) notFound();

  if (!recipes) return null;

  const hasSearchTerm =
    !!queryParam ||
    !!difficultyParam.length ||
    !!cuisineTypeParam.length ||
    !!mealTypeParam.length ||
    !!dietaryTagsParam.length ||
    !!maxCookingTimeParam;

  const showPagination = recipes.count > DATA_PER_PAGE;

  return (
    <div className="space-y-6">
      <UserRecipesTable recipes={recipes.data} hasSearchTerm={hasSearchTerm} />

      {showPagination && (
        <PaginationWithLinks
          page={page}
          pageSize={DATA_PER_PAGE}
          totalCount={recipes.count}
          pathPattern="/my-recipes/:page"
        />
      )}
    </div>
  );
}

export default function MyRecipesList(props: PageProps) {
  const { params, searchParams } = props;

  return (
    <Suspense fallback={<RecipesSkeleton />}>
      <MyRecipesLoader params={params} searchParams={searchParams} />
    </Suspense>
  );
}
