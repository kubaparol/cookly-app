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
