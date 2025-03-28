'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import { equipment, ingredients, recipes, steps, substitutions, tips } from '@/db';
import { db } from '@/db/drizzle';

import { ServerActionResponse } from '@/types';

export async function deleteRecipe(id: string): Promise<ServerActionResponse> {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db.delete(ingredients).where(eq(ingredients.recipeId, id));
    await db.delete(steps).where(eq(steps.recipeId, id));

    await db.delete(equipment).where(eq(equipment.recipeId, id));
    await db.delete(substitutions).where(eq(substitutions.recipeId, id));
    await db.delete(tips).where(eq(tips.recipeId, id));

    await db.delete(recipes).where(eq(recipes.id, id));

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
      message: `Failed to delete recipe: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
