'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SQL, and, eq, ilike } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { GetMyRecipesParams } from './types';

export async function getMyRecipes(params: GetMyRecipesParams) {
  const { query } = params;

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const filters: SQL[] = [
      eq(recipes.authorId, user.id),
      ...(query ? [ilike(recipes.title, `%${query}%`)] : []),
    ];

    return await db.query.recipes.findMany({
      where: and(...filters),
      with: {
        ingredients: true,
      },
    });
  } catch (error) {
    handleError(error);
  }
}
