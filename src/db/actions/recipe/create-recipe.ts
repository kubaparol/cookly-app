'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { handleError } from '@/utils';

import { ProjectUrls } from '@/constants';

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

    await db.insert(ingredients).values(
      recipe.ingredients.map((ingredient) => ({
        recipeId: newRecipe.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
    );

    await db.insert(steps).values(
      recipe.steps.map((step, index) => ({
        recipeId: newRecipe.id,
        description: step.description,
        order: index + 1,
      })),
    );

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    handleError(error);
  }
}
