'use server';

import { and } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { db } from '@/db/drizzle';

import { GetRecipesParams } from './types';

export async function getAllRecipes(params: GetRecipesParams) {
  const { limit, offset, ...rest } = params;

  const filters = createRecipeSqlFilters(rest);

  try {
    const countResult = await db.query.recipes.findMany({
      where: and(...filters),
      columns: {
        id: true,
      },
    });

    const totalCount = countResult.length;

    const recipes = await db.query.recipes.findMany({
      where: and(...filters),
      columns: {
        id: true,
        title: true,
        imageUrl: true,
        preparationTime: true,
        cookingTime: true,
        restTime: true,
        difficulty: true,
        dietaryTags: true,
        authorId: true,
      },
      limit: limit || DATA_PER_PAGE,
      offset: offset || 0,
    });

    return {
      count: totalCount,
      data: recipes,
    };
  } catch (error) {
    handleError(error);
  }
}
