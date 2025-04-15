import { Heart } from 'lucide-react';
import Link from 'next/link';
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
      {recipes.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No favorite recipes yet</h3>
          <p className="max-w-md text-base text-muted-foreground">
            You haven&apos;t added any recipes to your favorites yet. Your favorite recipes will
            appear here once you start saving recipes you love.
          </p>
          <Link
            href="/recipes/1"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Browse recipes
          </Link>
        </div>
      ) : (
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
      )}

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
