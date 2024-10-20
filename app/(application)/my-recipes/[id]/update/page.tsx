import { Metadata } from 'next';

import { getOneRecipe } from '@/db';

import PageTitle from '@/components/base/PageTitle';
import RecipeForm from '@/components/forms/RecipeForm';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Edit Recipe',
};

export default async function EditRecipePage(props: PageProps) {
  const id = props.params.id;

  const recipe = await getOneRecipe(id);

  return (
    <section className="grid gap-6">
      <PageTitle custom="Edit Recipe" />

      <RecipeForm
        id={id}
        type="Update"
        defaultValues={{
          title: recipe?.title || '',
          description: recipe?.description || undefined,
          imageUrl: recipe?.imageUrl || '',
          ingredients: recipe?.ingredients || [],
          steps: recipe?.steps || [],
        }}
      />
    </section>
  );
}
