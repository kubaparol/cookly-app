'use server';

import { SQL, and, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { ingredients, recipes, steps } from '@/db/schema';

export async function getOneRecipe(id: string) {
  try {
    const filters: SQL[] = [eq(recipes.id, id)];

    const [recipeData] = await db
      .select()
      .from(recipes)
      .where(and(...filters));

    if (!recipeData) return null;

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
      ingredients: ingredientsData.map((ingredient) => ({
        ...ingredient,
        quantity: ingredient.quantity.toString(),
      })),
      steps: stepsData,
      preparationTime: recipeData.preparationTime.toString(),
      cookingTime: recipeData.cookingTime.toString(),
      servings: recipeData.servings.toString(),
    };
  } catch (error) {
    handleError(error);
  }
}
