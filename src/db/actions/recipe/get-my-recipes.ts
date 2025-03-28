'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SQL, and, eq, ilike, inArray, sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { GetMyRecipesParams } from './types';

export async function getMyRecipes(params: GetMyRecipesParams) {
  const { query, difficulty, cuisineType, mealType, dietaryTags, maxCookingTime } = params;

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const filters: SQL[] = [
      eq(recipes.authorId, user.id),
      ...(query ? [ilike(recipes.title, `%${query}%`)] : []),
      ...(difficulty?.length ? [inArray(recipes.difficulty, difficulty)] : []),
      ...(cuisineType?.length ? [inArray(recipes.cuisineType, cuisineType)] : []),
      ...(mealType?.length ? [inArray(recipes.mealType, mealType)] : []),
      ...(dietaryTags?.length
        ? [
            sql`${recipes.dietaryTags} && ARRAY[${sql.join(
              dietaryTags.map((tag) => sql`${tag}`),
              sql`, `,
            )}]`,
          ]
        : []),
      ...(maxCookingTime
        ? [
            sql`(${recipes.preparationTime} + ${recipes.cookingTime} + ${recipes.restTime}) <= ${maxCookingTime}`,
          ]
        : []),
    ];

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
