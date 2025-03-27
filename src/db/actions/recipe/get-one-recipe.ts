'use server';

import { SQL, and, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import {
  equipment,
  ingredients,
  nutritionalInfo,
  recipes,
  steps,
  substitutions,
  tips,
} from '@/db/schema';

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

    const substitutionsData = await db
      .select({
        id: substitutions.id,
        original: substitutions.original,
        substitute: substitutions.substitute,
      })
      .from(substitutions)
      .where(eq(substitutions.recipeId, id));

    const tipsData = await db
      .select({
        id: tips.id,
        description: tips.description,
      })
      .from(tips)
      .where(eq(tips.recipeId, id));

    const nutritionalInfoData = await db
      .select({
        calories: nutritionalInfo.calories,
        protein: nutritionalInfo.protein,
        carbs: nutritionalInfo.carbs,
        fat: nutritionalInfo.fat,
      })
      .from(nutritionalInfo)
      .where(eq(nutritionalInfo.recipeId, id));

    const equipmentData = await db
      .select({
        id: equipment.id,
        name: equipment.name,
      })
      .from(equipment)
      .where(eq(equipment.recipeId, id));

    return {
      ...recipeData,
      ingredients: ingredientsData.map((ingredient) => ({
        ...ingredient,
        quantity: ingredient.quantity.toString(),
      })),
      steps: stepsData,
      substitutions: substitutionsData,
      tips: tipsData,
      nutritionalInfo: nutritionalInfoData[0] || {},
      preparationTime: recipeData.preparationTime.toString(),
      cookingTime: recipeData.cookingTime.toString(),
      restTime: recipeData.restTime?.toString(),
      activeTime: recipeData.activeTime?.toString(),
      servings: recipeData.servings.toString(),
      servingSize: recipeData.servingSize,
      yield: recipeData.yield,
      equipment: equipmentData,
      storageInstructions: recipeData.storageInstructions,
      reheatingInstructions: recipeData.reheatingInstructions,
      makeAheadInstructions: recipeData.makeAheadInstructions,
    };
  } catch (error) {
    handleError(error);
  }
}
