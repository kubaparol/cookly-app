'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { GetMyRecipesParams } from './types';

export async function getMyRecipes(params: GetMyRecipesParams) {
  const { limit, offset, ...rest } = params;

  const filters = createRecipeSqlFilters(rest);

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const countResult = await db.query.recipes.findMany({
      where: and(...filters, ...[eq(recipes.authorId, user.id)]),
      columns: {
        id: true,
      },
    });

    const totalCount = countResult.length;

    const recipesResult = await db.query.recipes.findMany({
      where: and(...filters, ...[eq(recipes.authorId, user.id)]),
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
      data: recipesResult,
    };
  } catch (error) {
    handleError(error);
  }
}
