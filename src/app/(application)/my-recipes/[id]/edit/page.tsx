import { Metadata } from 'next';

import { getOneRecipe } from '@/db';

import RecipeForm from '@/components/forms/recipe/RecipeForm';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Edit Recipe',
};

export default async function EditRecipePage(props: PageProps) {
  const id = props.params.id;

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
            calories: recipe.calories || undefined,
            protein: recipe.protein || undefined,
            carbs: recipe.carbs || undefined,
            fat: recipe.fat || undefined,
            allergens: recipe.allergens || undefined,
            seasonality: recipe.seasonality || undefined,
            costLevel: recipe.costLevel || undefined,
          }}
        />
      )}
    </section>
  );
}
