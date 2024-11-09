'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SQL, and, asc, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

export async function getRecentRecipes() {
  const user = await currentUser();

  try {
    if (!user) throw new Error('User not found');

    const filters: SQL[] = [eq(recipes.authorId, user.id)];

    return await db
      .select({ id: recipes.id, imageUrl: recipes.imageUrl, title: recipes.title })
      .from(recipes)
      .where(and(...filters))
      .limit(5)
      .orderBy(asc(recipes.createdAt));
  } catch (error) {
    handleError(error);
  }
}
