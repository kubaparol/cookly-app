'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { handleError } from '@/utils';

import { ProjectUrls } from '@/constants';

import { equipment, ingredients, recipes, steps, substitutions, tips } from '@/db';
import { db } from '@/db/drizzle';

import { RecipeFormValues } from '@/components/forms/recipe/schemas';

export async function createRecipe(recipe: RecipeFormValues) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const [newRecipe] = await db
      .insert(recipes)
      .values({
        ...recipe,
        authorId: user.id,
        preparationTime: parseInt(recipe.preparationTime),
        cookingTime: parseInt(recipe.cookingTime),
        restTime: recipe.restTime ? parseInt(recipe.restTime) : null,
        activeTime: recipe.activeTime ? parseInt(recipe.activeTime) : null,
        servings: parseInt(recipe.servings),
        calories: recipe.calories ? parseInt(recipe.calories) : null,
        protein: recipe.protein ? parseInt(recipe.protein) : null,
        carbs: recipe.carbs ? parseInt(recipe.carbs) : null,
        fat: recipe.fat ? parseInt(recipe.fat) : null,
      })
      .returning();

    await db.insert(ingredients).values(
      recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        recipeId: newRecipe.id,
        quantity: parseFloat(ingredient.quantity),
      })),
    );

    await db.insert(steps).values(
      recipe.steps.map((step, index) => ({
        ...step,
        recipeId: newRecipe.id,
        order: index + 1,
      })),
    );

    if (recipe.equipment && recipe.equipment.length > 0) {
      await db.insert(equipment).values(
        recipe.equipment.map((item) => ({
          ...item,
          recipeId: newRecipe.id,
        })),
      );
    }

    if (recipe.substitutions && recipe.substitutions.length > 0) {
      await db.insert(substitutions).values(
        recipe.substitutions.map((sub) => ({
          ...sub,
          recipeId: newRecipe.id,
        })),
      );
    }

    if (recipe.tipsAndTricks && recipe.tipsAndTricks.length > 0) {
      await db.insert(tips).values(
        recipe.tipsAndTricks.map((tip) => ({
          ...tip,
          recipeId: newRecipe.id,
        })),
      );
    }

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    handleError(error);
  }
}
