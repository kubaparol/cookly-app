'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SQL, and, eq, ilike } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { ingredients, recipes, steps } from '@/db/schema';

export async function getOneRecipe(id: string) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const filters: SQL[] = [eq(recipes.id, id), eq(recipes.authorId, user.id)];

    const [recipeData] = await db
      .select()
      .from(recipes)
      .where(and(...filters));

    const ingredientsData = await db
      .select({
        id: ingredients.id,
        name: ingredients.name,
        quantity: ingredients.quantity,
        unit: ingredients.unit,
      })
      .from(ingredients)
      .where(eq(ingredients.recipeId, id));

    const stepsData = await db
      .select({
        id: steps.id,
        description: steps.description,
        order: steps.order,
      })
      .from(steps)
      .where(eq(steps.recipeId, id));

    return {
      ...recipeData,
      ingredients: ingredientsData,
      steps: stepsData,
    };
  } catch (error) {
    handleError(error);
  }
}
