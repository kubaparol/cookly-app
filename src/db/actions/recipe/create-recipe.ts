'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { handleError } from '@/utils';

import { ProjectUrls } from '@/constants';

import { ingredients, nutritionalInfo, recipes, steps, substitutions, tips } from '@/db';
import { db } from '@/db/drizzle';

import { RecipeFormValues } from '@/components/forms/recipe/schemas';

export async function createRecipe(recipe: RecipeFormValues) {
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
        cuisineType: recipe.cuisineType,
        mealType: recipe.mealType,
        categories: recipe.categories,
        preparationTime: parseInt(recipe.preparationTime),
        cookingTime: parseInt(recipe.cookingTime),
        restTime: recipe.restTime ? parseInt(recipe.restTime) : null,
        activeTime: recipe.activeTime ? parseInt(recipe.activeTime) : null,
        servings: parseInt(recipe.servings),
        servingSize: recipe.servingSize,
        yield: recipe.yield,
        difficulty: recipe.difficulty,
        dietaryTags: recipe.dietaryTags,
        equipment: recipe.equipment,
        storageInstructions: recipe.storageInstructions,
        reheatingInstructions: recipe.reheatingInstructions,
        makeAheadInstructions: recipe.makeAheadInstructions,
        allergens: recipe.allergens,
        seasonality: recipe.seasonality,
        costLevel: recipe.costLevel,
        notes: recipe.notes,
      })
      .returning();

    await db.insert(ingredients).values(
      recipe.ingredients.map((ingredient) => ({
        recipeId: newRecipe.id,
        name: ingredient.name,
        quantity: parseFloat(ingredient.quantity),
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

    if (recipe.substitutions && recipe.substitutions.length > 0) {
      await db.insert(substitutions).values(
        recipe.substitutions.map((sub) => ({
          recipeId: newRecipe.id,
          original: sub.original,
          substitute: sub.substitute,
        })),
      );
    }

    if (recipe.tipsAndTricks && recipe.tipsAndTricks.length > 0) {
      await db.insert(tips).values(
        recipe.tipsAndTricks.map((tip) => ({
          recipeId: newRecipe.id,
          description: tip.description,
        })),
      );
    }

    if (recipe.nutritionalInfo) {
      await db.insert(nutritionalInfo).values({
        recipeId: newRecipe.id,
        calories: recipe.nutritionalInfo.calories
          ? parseInt(recipe.nutritionalInfo.calories)
          : null,
        protein: recipe.nutritionalInfo.protein ? parseInt(recipe.nutritionalInfo.protein) : null,
        carbs: recipe.nutritionalInfo.carbs ? parseInt(recipe.nutritionalInfo.carbs) : null,
        fat: recipe.nutritionalInfo.fat ? parseInt(recipe.nutritionalInfo.fat) : null,
      });
    }

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    handleError(error);
  }
}
