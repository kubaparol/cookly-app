'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SQL, and, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

export async function getCardData() {
  const user = await currentUser();

  try {
    if (!user) throw new Error('User not found');

    const filters: SQL[] = [eq(recipes.authorId, user.id)];

    return await db.$count(recipes, and(...filters));
  } catch (error) {
    handleError(error);
  }
}
