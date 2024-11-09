import { Metadata } from 'next';
import { Suspense } from 'react';

import PageTitle from '@/components/base/PageTitle';
import RecipeFormContainer from '@/components/containers/RecipeFormContainer';
import { RecipeFormSkeleton } from '@/components/shared/skeletons';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Edit Recipe',
};

export default async function EditRecipePage(props: PageProps) {
  const id = props.params.id;

  return (
    <section className="grid gap-6">
      <PageTitle title="Edit Recipe" />

      <Suspense fallback={<RecipeFormSkeleton />}>
        <RecipeFormContainer id={id} />
      </Suspense>
    </section>
  );
}
