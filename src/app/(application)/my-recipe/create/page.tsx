import { Metadata } from 'next';

import RecipeForm from '@/components/forms/recipe/RecipeForm';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Create Recipe',
};

export default function CreateRecipePage(props: PageProps) {
  return (
    <section className="flex h-full flex-col gap-6">
      <RecipeForm type="Create" isSuccess={props.searchParams?.success === 'true'} />
    </section>
  );
}
