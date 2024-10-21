'use server';

import { SQL, and, ilike } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { GetMyRecipesParams } from './types';

export async function getAllRecipes(params: GetMyRecipesParams) {
  const { query } = params;

  try {
    const filters: SQL[] = [...(query ? [ilike(recipes.title, `%${query}%`)] : [])];

    return await db
      .select({
        id: recipes.id,
        title: recipes.title,
        imageUrl: recipes.imageUrl,
        authorId: recipes.authorId,
      })
      .from(recipes)
      .where(and(...filters));
  } catch (error) {
    handleError(error);
  }
}
