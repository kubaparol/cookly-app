'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { comments, recipes } from '@/db/schema';

export async function updateRecipeAverageScore(recipeId: string) {
  const result = await db.query.comments.findMany({
    where: eq(comments.recipeId, recipeId),
    columns: {
      rating: true,
    },
  });

  const averageRating = result.reduce((acc, curr) => acc + curr.rating, 0) / result.length;

  await db.update(recipes).set({ averageRating }).where(eq(recipes.id, recipeId));
}
