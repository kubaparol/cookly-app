'use server';

import { currentUser } from '@clerk/nextjs/server';

import { handleError } from '@/utils';

import { CreateRecipeParams, ingredients, recipes, steps } from '@/db';
import { db } from '@/db/drizzle';

export async function createRecipe(recipe: CreateRecipeParams) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const [newRecipe] = await db
      .insert(recipes)
      .values({
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        authorId: user.id,
      })
      .returning();

    for (const ingredient of recipe.ingredients) {
      await db.insert(ingredients).values({
        recipeId: newRecipe.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
    }

    for (let i = 0; i < recipe.steps.length; i++) {
      await db.insert(steps).values({
        recipeId: newRecipe.id,
        description: recipe.steps[i].description,
        order: i + 1,
      });
    }

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    handleError(error);
  }
}
