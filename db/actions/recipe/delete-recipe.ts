'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { recipes } from '@/db';
import { db } from '@/db/drizzle';

export async function deleteRecipe(id: string) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    return await db.delete(recipes).where(eq(recipes.id, id));
  } catch (error) {
    handleError(error);
  }
}
