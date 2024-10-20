import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

export async function getMyRecipes() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    return await db
      .select({
        id: recipes.id,
        title: recipes.title,
        imageUrl: recipes.imageUrl,
      })
      .from(recipes)
      .where(eq(recipes.authorId, user.id));
  } catch (error) {
    handleError(error);
  }
}
