import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { useRecipeSearchParams } from '@/hooks';

import { getTotalCookingTime } from '@/utils';

import { ProjectUrls } from '@/constants';

import { getMyRecipes } from '@/db';

import { RecipeCard } from '@/components/modules/recipes/RecipeCard';
import StatusCard from '@/components/shared/StatusCard';
import { RecipesSkeleton } from '@/components/shared/skeletons';

import { PageProps } from '@/types';

async function MyRecipesLoader(props: PageProps) {
  const { searchParams } = props;

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
    }),
  ]);

  if (!user) notFound();

  if (
    recipes?.length === 0 &&
    !queryParam &&
    !difficultyParam.length &&
    !cuisineTypeParam.length &&
    !mealTypeParam.length &&
    !dietaryTagsParam.length &&
    !maxCookingTimeParam
  ) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <StatusCard
          type="no-icon"
          title="You haven't created any recipes yet"
          primaryAction={{
            label: 'Create your first recipe',
            href: ProjectUrls.createRecipe,
          }}
        />
      </div>
    );
  }

  if (recipes?.length === 0) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <StatusCard
          type="sad"
          title="Recipes not found"
          message="Sorry, but we could not find the recipes matching your filters."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes?.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            cookingTime={getTotalCookingTime({
              preparationTime: recipe.preparationTime,
              cookingTime: recipe.cookingTime,
              restTime: recipe.restTime || 0,
            })}
            difficulty={recipe.difficulty}
            dietaryTags={recipe.dietaryTags}
            isAuthor={user?.id === recipe.authorId}
            openInNewTab
          />
        ))}
      </div>
    </div>
  );
}

export default function MyRecipesList(props: PageProps) {
  const { searchParams } = props;

  return (
    <Suspense fallback={<RecipesSkeleton />}>
      <MyRecipesLoader searchParams={searchParams} />
    </Suspense>
  );
}
