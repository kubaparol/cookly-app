'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import { db } from '@/db/drizzle';
import { RecipeStatus, recipes } from '@/db/schema';

export async function setRecipeStatus(id: string, status: RecipeStatus) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db.update(recipes).set({ status }).where(eq(recipes.id, id));

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.editRecipe(id));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to set recipe status: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
