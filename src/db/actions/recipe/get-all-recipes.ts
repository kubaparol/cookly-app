'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { db } from '@/db/drizzle';
import { favorites, recipes } from '@/db/schema';

import { GetRecipesParams } from './types';

export async function getAllRecipes(params: GetRecipesParams) {
  const { limit, offset, ...rest } = params;

  const filters = createRecipeSqlFilters(rest);

  const statusFilter = eq(recipes.status, 'published');

  try {
    const user = await currentUser();

    const countResult = await db.query.recipes.findMany({
      where: and(...filters, ...[statusFilter]),
      columns: {
        id: true,
      },
    });

    const totalCount = countResult.length;

    const recipesResult = await db.query.recipes.findMany({
      where: and(...filters, ...[statusFilter]),
      columns: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        preparationTime: true,
        cookingTime: true,
        restTime: true,
        difficulty: true,
        servings: true,
        dietaryTags: true,
        averageRating: true,
        cuisineType: true,
        authorId: true,
      },
      with: {
        favorites: {
          where: eq(favorites.userId, user?.id || ''),
          columns: {
            id: true,
          },
        },
      },
      limit: limit || DATA_PER_PAGE,
      offset: offset || 0,
    });

    return {
      count: totalCount,
      data: recipesResult,
    };
  } catch (error) {
    handleError(error);
  }
}
