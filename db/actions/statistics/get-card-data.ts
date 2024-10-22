'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SQL, and, count, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

export async function getCardData() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const filters: SQL[] = [eq(recipes.authorId, user.id)];

    const [numberOfRecipes] = await db
      .select({ count: count() })
      .from(recipes)
      .where(and(...filters));

    return numberOfRecipes;
  } catch (error) {
    handleError(error);
  }
}
