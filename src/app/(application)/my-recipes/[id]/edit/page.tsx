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
            tipsAndTricks: recipe.tipsAndTricks?.map((tip) => ({ description: tip })) || [],
            substitutions:
              recipe.substitutions?.map((sub) => {
                const [original, substitute] = sub.split(' -> ');
                return { original, substitute };
              }) || undefined,
            nutritionalInfo:
              recipe.nutritionalInfo?.reduce((acc, curr) => {
                const [key, value] = curr.split(': ');
                return { ...acc, [key]: value };
              }, {}) || undefined,
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
