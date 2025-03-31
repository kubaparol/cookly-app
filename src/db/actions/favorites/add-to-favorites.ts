'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import { db } from '@/db/drizzle';
import { favorites } from '@/db/schema';

import { ServerActionResponse } from '@/types';

export async function addToFavorites(recipeId: string): Promise<ServerActionResponse> {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db.insert(favorites).values({
      recipeId,
      userId: user.id,
    });

    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.recipe(recipeId));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add to favorites: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
