import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getOneRecipe } from '@/db';

import RecipeForm from '@/components/forms/recipe/RecipeForm';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Edit Recipe',
};

export default async function EditRecipePage(props: PageProps) {
  const id = props.params?.id;

  if (!id) {
    notFound();
  }

  const recipe = await getOneRecipe(id);

  return (
    <section className="flex h-full flex-col gap-6">
      {recipe && (
        <RecipeForm
          id={id}
          type="Update"
          defaultValues={{
            ...recipe,
            description: recipe.description || '',
            notes: recipe.notes || undefined,
            servingSize: recipe.servingSize || undefined,
            yield: recipe.yield || undefined,
            equipment: recipe.equipment || undefined,
            storageInstructions: recipe.storageInstructions || undefined,
            reheatingInstructions: recipe.reheatingInstructions || undefined,
            makeAheadInstructions: recipe.makeAheadInstructions || undefined,
            substitutions: recipe.substitutions || [],
            tipsAndTricks: recipe.tips || [],
            calories: recipe.calories?.toString() || undefined,
            protein: recipe.protein?.toString() || undefined,
            carbs: recipe.carbs?.toString() || undefined,
            fat: recipe.fat?.toString() || undefined,
            allergens: recipe.allergens || undefined,
            seasonality: recipe.seasonality || undefined,
            costLevel: recipe.costLevel || undefined,
            preparationTime: recipe.preparationTime?.toString() || undefined,
            cookingTime: recipe.cookingTime?.toString() || undefined,
            servings: recipe.servings?.toString() || undefined,
            ingredients: recipe.ingredients?.map((ingredient) => ({
              ...ingredient,
              quantity: ingredient.quantity.toString(),
            })),
            restTime: recipe.restTime?.toString() || undefined,
            activeTime: recipe.activeTime?.toString() || undefined,
          }}
        />
      )}
    </section>
  );
}
