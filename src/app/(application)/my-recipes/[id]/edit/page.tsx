import { Metadata } from 'next';

import { getOneRecipe } from '@/db';

import PageTitle from '@/components/base/PageTitle';
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
      <PageTitle title="Edit Recipe" />

      {/* <Suspense fallback={<RecipeFormSkeleton />}> */}
      {recipe && (
        <RecipeForm
          id={id}
          type="Update"
          defaultValues={{
            ...recipe,
            description: recipe.description || undefined,
            notes: recipe.notes || undefined,
            servingSize: recipe.servingSize || undefined,
            yield: recipe.yield || undefined,
            equipment: recipe.equipment || undefined,
            storageInstructions: recipe.storageInstructions || undefined,
            reheatingInstructions: recipe.reheatingInstructions || undefined,
            makeAheadInstructions: recipe.makeAheadInstructions || undefined,
            substitutions: recipe.substitutions || [],
            tipsAndTricks: recipe.tips || [],
            nutritionalInfo: {
              calories: recipe.nutritionalInfo?.calories?.toString() || undefined,
              protein: recipe.nutritionalInfo?.protein?.toString() || undefined,
              carbs: recipe.nutritionalInfo?.carbs?.toString() || undefined,
              fat: recipe.nutritionalInfo?.fat?.toString() || undefined,
            },
            allergens: recipe.allergens || undefined,
            seasonality: recipe.seasonality || undefined,
            costLevel: recipe.costLevel || undefined,
          }}
        />
      )}
      {/* </Suspense> */}
    </section>
  );
}
