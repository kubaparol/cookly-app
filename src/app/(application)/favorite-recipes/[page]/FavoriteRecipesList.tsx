import { Suspense } from 'react';

import { calculateOffset, getTotalCookingTime } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { getFavoriteRecipes } from '@/db';

import { RecipeCard } from '@/components/modules/recipes/RecipeCard';
import { RecipesSkeleton } from '@/components/shared/skeletons';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

import { PageProps } from '@/types';

async function FavoriteRecipesLoader(props: PageProps) {
  const { params } = props;

  const page = Number(params?.page);
  const offset = calculateOffset(page, DATA_PER_PAGE);

  const recipes = await getFavoriteRecipes({
    limit: DATA_PER_PAGE,
    offset,
  });

  if (!recipes) return null;

  const showPagination = recipes.count > DATA_PER_PAGE;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.data.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.recipes.id}
            title={recipe.recipes.title}
            description={recipe.recipes.description || ''}
            imageUrl={recipe.recipes.imageUrl}
            cookingTime={getTotalCookingTime({
              preparationTime: recipe.recipes.preparationTime || 0,
              cookingTime: recipe.recipes.cookingTime || 0,
              restTime: recipe.recipes.restTime || 0,
            })}
            servings={recipe.recipes.servings}
            averageRating={recipe.recipes.averageRating || 0}
            cuisineType={recipe.recipes.cuisineType}
            difficulty={recipe.recipes.difficulty}
            dietaryTags={recipe.recipes.dietaryTags}
            isFavorite={recipe.recipes.favoriteId !== null}
          />
        ))}
      </div>

      {showPagination && (
        <PaginationWithLinks
          page={page}
          pageSize={DATA_PER_PAGE}
          totalCount={recipes.count}
          pathPattern="/favorite-recipes/:page"
        />
      )}
    </div>
  );
}

export default function FavoriteRecipesList(props: PageProps) {
  return (
    <Suspense fallback={<RecipesSkeleton />}>
      <FavoriteRecipesLoader {...props} />
    </Suspense>
  );
}
