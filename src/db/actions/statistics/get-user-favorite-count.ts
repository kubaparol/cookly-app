'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { favorites } from '@/db/schema';

export async function getUserFavoriteCount() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const count = await db.query.favorites.findMany({
      where: eq(favorites.userId, user.id),
      columns: {
        recipeId: true,
      },
    });

    return count.length;
  } catch (error) {
    handleError(error);
  }
}
