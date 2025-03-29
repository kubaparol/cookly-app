'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { GetMyRecipesParams } from './types';

export async function getMyRecipes(params: GetMyRecipesParams) {
  const filters = createRecipeSqlFilters(params);

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    return await db.query.recipes.findMany({
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
    });
  } catch (error) {
    handleError(error);
  }
}
