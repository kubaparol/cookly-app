import { Suspense } from 'react';

import { useRecipeSearchParams } from '@/hooks';

import { getTotalCookingTime } from '@/utils';

import { getAllRecipes } from '@/db';

import { RecipeCard } from '@/components/modules/recipes/RecipeCard';
import StatusCard from '@/components/shared/StatusCard';
import { RecipesSkeleton } from '@/components/shared/skeletons';

import { PageProps } from '@/types';

async function AllRecipesLoader(props: PageProps) {
  const { searchParams } = props;

  const {
    difficultyParam,
    cuisineTypeParam,
    mealTypeParam,
    dietaryTagsParam,
    maxCookingTimeParam,
    queryParam,
  } = useRecipeSearchParams(searchParams);

  const recipes = await getAllRecipes({
    query: queryParam,
    difficulty: difficultyParam,
    cuisineType: cuisineTypeParam,
    mealType: mealTypeParam,
    dietaryTags: dietaryTagsParam,
    maxCookingTime: maxCookingTimeParam,
  });

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
            openInNewTab
          />
        ))}
      </div>
    </div>
  );
}

export default function AllRecipesList(props: PageProps) {
  const { searchParams } = props;
  return (
    <Suspense fallback={<RecipesSkeleton />}>
      <AllRecipesLoader searchParams={searchParams} />
    </Suspense>
  );
}
