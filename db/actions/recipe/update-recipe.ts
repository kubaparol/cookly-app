'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { UpdateRecipeParams, ingredients, recipes, steps } from '@/db';
import { db } from '@/db/drizzle';

export async function updateRecipe(recipe: UpdateRecipeParams) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const [newRecipe] = await db
      .update(recipes)
      .set({
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        authorId: user.id,
      })
      .where(eq(recipes.id, recipe.id))
      .returning();

    for (const ingredient of recipe.ingredients) {
      await db
        .update(ingredients)
        .set({
          recipeId: newRecipe.id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })
        .where(eq(ingredients.id, ingredient.id));
    }

    for (const step of recipe.steps) {
      await db
        .update(steps)
        .set({
          recipeId: newRecipe.id,
          description: step.description,
          order: step.order,
        })
        .where(eq(steps.id, step.id));
    }

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    handleError(error);
  }
}
