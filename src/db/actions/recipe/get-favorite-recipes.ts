'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, desc, eq, inArray } from 'drizzle-orm';

import { handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { db } from '@/db/drizzle';
import { favorites, recipes } from '@/db/schema';

import { PaginationRequest } from '@/types';

export async function getFavoriteRecipes(params: PaginationRequest) {
  const { limit, offset } = params;

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const favoritesData = await db.query.favorites.findMany({
      where: eq(favorites.userId, user.id),
      columns: {
        recipeId: true,
      },
    });

    const favoriteRecipeIds = favoritesData.map((fav) => fav.recipeId);

    if (favoriteRecipeIds.length === 0) {
      return {
        count: 0,
        data: [],
      };
    }

    const countResult = await db.query.recipes.findMany({
      where: and(eq(recipes.status, 'published'), inArray(recipes.id, favoriteRecipeIds)),
      columns: {
        id: true,
      },
    });

    const totalCount = countResult.length;

    const recipesResult = await db
      .select({
        recipes: {
          id: recipes.id,
          title: recipes.title,
          description: recipes.description,
          imageUrl: recipes.imageUrl,
          preparationTime: recipes.preparationTime,
          cookingTime: recipes.cookingTime,
          restTime: recipes.restTime,
          difficulty: recipes.difficulty,
          servings: recipes.servings,
          dietaryTags: recipes.dietaryTags,
          averageRating: recipes.averageRating,
          cuisineType: recipes.cuisineType,
          authorId: recipes.authorId,
          favoriteId: favorites.id,
        },
      })
      .from(recipes)
      .innerJoin(
        favorites,
        and(eq(favorites.recipeId, recipes.id), eq(favorites.userId, user?.id || '')),
      )
      .where(and(eq(recipes.status, 'published'), inArray(recipes.id, favoriteRecipeIds)))
      .orderBy(desc(favorites.createdAt))
      .limit(limit || DATA_PER_PAGE)
      .offset(offset || 0);

    return {
      count: totalCount,
      data: recipesResult,
    };
  } catch (error) {
    handleError(error);
  }
}
