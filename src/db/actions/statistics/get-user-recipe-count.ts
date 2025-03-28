'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

export async function getUserRecipeCount() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const count = await db.query.recipes.findMany({
      where: eq(recipes.authorId, user.id),
      columns: {
        id: true,
      },
    });

    return count.length;
  } catch (error) {
    handleError(error);
  }
}
