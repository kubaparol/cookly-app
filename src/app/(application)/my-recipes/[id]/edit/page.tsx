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
      {recipe && <RecipeForm id={id} type="Update" defaultValues={recipe} />}
      {/* </Suspense> */}
    </section>
  );
}
