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

    const existingIngredients = await db
      .select()
      .from(ingredients)
      .where(eq(ingredients.recipeId, newRecipe.id));

    const existingSteps = await db.select().from(steps).where(eq(steps.recipeId, newRecipe.id));

    await updateOrInsertEntities(
      ingredients,
      existingIngredients,
      recipe.ingredients,
      'id',
      newRecipe.id,
    );

    await updateOrInsertEntities(steps, existingSteps, recipe.steps, 'id', newRecipe.id);

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
