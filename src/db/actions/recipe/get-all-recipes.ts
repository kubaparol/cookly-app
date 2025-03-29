'use server';

import { and } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { db } from '@/db/drizzle';

import { GetRecipesParams } from './types';

export async function getAllRecipes(params: GetRecipesParams) {
  const filters = createRecipeSqlFilters(params);

  try {
    return await db.query.recipes.findMany({
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
    });
  } catch (error) {
    handleError(error);
  }
}
