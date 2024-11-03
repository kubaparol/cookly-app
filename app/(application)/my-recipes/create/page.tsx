import { Metadata } from 'next';

import PageTitle from '@/components/base/PageTitle';
import RecipeFormContainerV2 from '@/components/containers/RecipeFormContainerV2';
import RecipeForm from '@/components/forms/RecipeForm';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Create Recipe',
};

export default function CreateRecipePage(props: PageProps) {
  const isSuccess = props.searchParams.success === 'true';

  return (
    <section className="flex h-full flex-col gap-6">
      {!isSuccess && <PageTitle title="Create Recipe" />}

      {/* <RecipeForm type="Create" isSuccess={props.searchParams.success === 'true'} /> */}

      <RecipeFormContainerV2 />
    </section>
  );
}
