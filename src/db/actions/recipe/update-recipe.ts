'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { handleError } from '@/utils';

import { ProjectUrls } from '@/constants';

import {
  UpdateRecipeParams,
  ingredients,
  nutritionalInfo,
  recipes,
  steps,
  substitutions,
  tips,
} from '@/db';
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

    const existingNutritionalInfo = await db
      .select()
      .from(nutritionalInfo)
      .where(eq(nutritionalInfo.recipeId, newRecipe.id));

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

    if (recipe.nutritionalInfo) {
      const nutritionalData = {
        recipeId: newRecipe.id,
        calories: recipe.nutritionalInfo.calories
          ? parseInt(recipe.nutritionalInfo.calories)
          : null,
        protein: recipe.nutritionalInfo.protein ? parseInt(recipe.nutritionalInfo.protein) : null,
        carbs: recipe.nutritionalInfo.carbs ? parseInt(recipe.nutritionalInfo.carbs) : null,
        fat: recipe.nutritionalInfo.fat ? parseInt(recipe.nutritionalInfo.fat) : null,
      };

      if (existingNutritionalInfo.length > 0) {
        await db
          .update(nutritionalInfo)
          .set(nutritionalData)
          .where(eq(nutritionalInfo.recipeId, newRecipe.id));
      } else {
        await db.insert(nutritionalInfo).values(nutritionalData);
      }
    }

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
