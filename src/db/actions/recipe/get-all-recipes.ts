'use server';

import { and, eq } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { GetRecipesParams } from './types';

export async function getAllRecipes(params: GetRecipesParams) {
  const { limit, offset, ...rest } = params;

  const filters = createRecipeSqlFilters(rest);

  const statusFilter = eq(recipes.status, 'published');

  try {
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
