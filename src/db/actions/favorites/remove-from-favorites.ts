'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import { db } from '@/db/drizzle';
import { favorites } from '@/db/schema';

import { ServerActionResponse } from '@/types';

export async function removeFromFavorites(recipeId: string): Promise<ServerActionResponse> {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db
      .delete(favorites)
      .where(and(eq(favorites.recipeId, recipeId), eq(favorites.userId, user.id)));

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.recipe(recipeId));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to remove from favorites: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
