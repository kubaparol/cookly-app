'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import {
  UpdateRecipeParams,
  equipment,
  ingredients,
  recipes,
  steps,
  substitutions,
  tips,
} from '@/db';
import { db } from '@/db/drizzle';

import { ServerActionResponse } from '@/types';

interface UpdateRecipeParamsExtended extends UpdateRecipeParams {
  status: 'draft' | 'published' | 'archived';
  canBePublished: boolean;
}

export async function updateRecipe(
  params: UpdateRecipeParamsExtended,
): Promise<ServerActionResponse> {
  try {
    const { status, canBePublished, ...recipe } = params;
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const [newRecipe] = await db
      .update(recipes)
      .set({
        ...recipe,
        authorId: user.id,
        calories: recipe.calories ? parseInt(recipe.calories) : null,
        protein: recipe.protein ? parseInt(recipe.protein) : null,
        carbs: recipe.carbs ? parseInt(recipe.carbs) : null,
        fat: recipe.fat ? parseInt(recipe.fat) : null,
        status,
        canBePublished,
      })
      .where(eq(recipes.id, recipe.id))
      .returning();

    const existingIngredients = await db
      .select()
      .from(ingredients)
      .where(eq(ingredients.recipeId, newRecipe.id));

    const existingSteps = await db.select().from(steps).where(eq(steps.recipeId, newRecipe.id));

    const existingSubstitutions = await db
      .select()
      .from(substitutions)
      .where(eq(substitutions.recipeId, newRecipe.id));

    const existingTips = await db.select().from(tips).where(eq(tips.recipeId, newRecipe.id));

    const existingEquipment = await db
      .select()
      .from(equipment)
      .where(eq(equipment.recipeId, newRecipe.id));

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

    await updateOrInsertEntities(
      substitutions,
      existingSubstitutions,
      recipe.substitutions || [],
      'id',
      newRecipe.id,
    );

    await updateOrInsertEntities(
      tips,
      existingTips,
      recipe.tipsAndTricks || [],
      'id',
      newRecipe.id,
    );

    await updateOrInsertEntities(
      equipment,
      existingEquipment,
      recipe.equipment || [],
      'id',
      newRecipe.id,
    );

    revalidatePath(ProjectUrls.dashboard);
    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.editRecipe(newRecipe.id));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update recipe: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
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
