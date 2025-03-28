import { currentUser } from '@clerk/nextjs/server';
import { Suspense } from 'react';

import { getTotalCookingTime } from '@/utils';

import { ProjectUrls } from '@/constants';

import { getAllRecipes, getMyRecipes } from '@/db';

import StatusCard from '@/components/shared/StatusCard';
import { RecipesSkeleton } from '@/components/shared/skeletons';

import { PageProps } from '@/types';

import { RecipeCard } from './RecipeCard';

export interface RecipesListProps extends PageProps {
  isPersonal?: boolean;
  createRecipeUrl?: string;
}

async function RecipesLoader({ searchParams, isPersonal, createRecipeUrl }: RecipesListProps) {
  const { difficulty, cuisineType, mealType, dietaryTags, maxCookingTime, query } =
    searchParams || {};

  const difficultyParam = difficulty ? (difficulty as string).split('_') : [];
  const cuisineTypeParam = cuisineType ? (cuisineType as string).split('_') : [];
  const mealTypeParam = mealType ? (mealType as string).split('_') : [];
  const dietaryTagsParam = dietaryTags ? (dietaryTags as string).split('_') : [];
  const maxCookingTimeParam = maxCookingTime as string | undefined;
  const queryParam = query as string;

  const user = isPersonal ? await currentUser() : null;

  const recipeParams = {
    query: queryParam,
    difficulty: difficultyParam,
    cuisineType: cuisineTypeParam,
    mealType: mealTypeParam,
    dietaryTags: dietaryTagsParam,
    maxCookingTime: maxCookingTimeParam ? parseInt(maxCookingTimeParam) : undefined,
  };

  const recipes = isPersonal ? await getMyRecipes(recipeParams) : await getAllRecipes(recipeParams);

  // For personal recipes, show empty state if no recipes and no filters
  if (
    isPersonal &&
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
            href: createRecipeUrl || ProjectUrls.createRecipe,
          }}
        />
      </div>
    );
  }

  // Generic no recipes found state
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

export default function RecipesList({
  searchParams,
  isPersonal,
  createRecipeUrl,
}: RecipesListProps) {
  return (
    <Suspense fallback={<RecipesSkeleton />}>
      <RecipesLoader
        searchParams={searchParams}
        isPersonal={isPersonal}
        createRecipeUrl={createRecipeUrl}
      />
    </Suspense>
  );
}
