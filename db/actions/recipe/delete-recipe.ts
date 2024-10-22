'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { handleError } from '@/utils';

import { ProjectUrls } from '@/constants';

import { recipes } from '@/db';
import { db } from '@/db/drizzle';

export async function deleteRecipe(id: string) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db.delete(recipes).where(eq(recipes.id, id));

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.editRecipe(id));

    return JSON.parse(JSON.stringify({ message: 'OK' }));
  } catch (error) {
    handleError(error);
  }
}
