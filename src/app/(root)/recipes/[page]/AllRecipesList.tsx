import { Suspense } from 'react';

import { useRecipeSearchParams } from '@/hooks';

import { calculateOffset, getTotalCookingTime } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { getAllRecipes } from '@/db';

import { RecipeCard } from '@/components/modules/recipes/RecipeCard';
import StatusCard from '@/components/shared/StatusCard';
import { RecipesSkeleton } from '@/components/shared/skeletons';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

import { PageProps } from '@/types';

async function AllRecipesLoader(props: PageProps) {
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

  const recipes = await getAllRecipes({
    query: queryParam,
    difficulty: difficultyParam,
    cuisineType: cuisineTypeParam,
    mealType: mealTypeParam,
    dietaryTags: dietaryTagsParam,
    maxCookingTime: maxCookingTimeParam,
    limit: DATA_PER_PAGE,
    offset,
  });

  if (!recipes) return null;

  if (recipes.data.length === 0) {
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
        {recipes.data.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description || ''}
            imageUrl={recipe.imageUrl}
            cookingTime={getTotalCookingTime({
              preparationTime: recipe.preparationTime,
              cookingTime: recipe.cookingTime,
              restTime: recipe.restTime || 0,
            })}
            servings={recipe.servings}
            averageRating={recipe.averageRating || 0}
            cuisineType={recipe.cuisineType}
            difficulty={recipe.difficulty}
            dietaryTags={recipe.dietaryTags}
            isFavorite={recipe.favorites.length > 0}
          />
        ))}
      </div>

      <PaginationWithLinks
        page={page}
        pageSize={DATA_PER_PAGE}
        totalCount={recipes.count}
        pathPattern="/recipes/:page"
      />
    </div>
  );
}

export default function AllRecipesList(props: PageProps) {
  const { params, searchParams } = props;

  return (
    <Suspense fallback={<RecipesSkeleton />}>
      <AllRecipesLoader params={params} searchParams={searchParams} />
    </Suspense>
  );
}
