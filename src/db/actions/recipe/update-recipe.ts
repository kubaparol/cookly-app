'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { handleError } from '@/utils';

import { ProjectUrls } from '@/constants';

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
        cuisineType: recipe.cuisineType,
        mealType: recipe.mealType,
        categories: recipe.categories,
        preparationTime: parseInt(recipe.preparationTime),
        cookingTime: parseInt(recipe.cookingTime),
        servings: parseInt(recipe.servings),
        difficulty: recipe.difficulty,
        dietaryTags: recipe.dietaryTags,
        notes: recipe.notes,
      })
      .where(eq(recipes.id, recipe.id))
      .returning();

    const existingIngredients = await db
      .select()
      .from(ingredients)
      .where(eq(ingredients.recipeId, newRecipe.id));

    const existingSteps = await db.select().from(steps).where(eq(steps.recipeId, newRecipe.id));

    await updateOrInsertEntities(
      ingredients,
      existingIngredients,
      recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: parseFloat(ingredient.quantity),
      })),
      'id',
      newRecipe.id,
    );

    await updateOrInsertEntities(steps, existingSteps, recipe.steps, 'id', newRecipe.id);

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.editRecipe(newRecipe.id));

    return JSON.parse(JSON.stringify(newRecipe));
  } catch (error) {
    handleError(error);
  }
}

async function updateOrInsertEntities(
  dbTable: any,
  existingEntities: any[],
  newEntities: any[],
  entityIdField: string,
  recipeId: string,
) {
  const existingEntitiesMap = new Map(
    existingEntities.map((entity) => [entity[entityIdField], entity]),
  );

  const operations = newEntities.map((entity) => {
    if (entity[entityIdField] && existingEntitiesMap.has(entity[entityIdField])) {
      existingEntitiesMap.delete(entity[entityIdField]);
      return db
        .update(dbTable)
        .set({
          ...entity,
          recipeId,
        })
        .where(eq(dbTable[entityIdField], entity[entityIdField]));
    } else {
      return db.insert(dbTable).values({
        ...entity,
        recipeId,
      });
    }
  });

  const deleteOperations = Array.from(existingEntitiesMap.keys()).map((id) =>
    db.delete(dbTable).where(eq(dbTable[entityIdField], id)),
  );

  await Promise.all([...operations, ...deleteOperations]);
}
