import { Metadata } from 'next';

import PageTitle from '@/components/base/PageTitle';
import RecipeForm from '@/components/forms/RecipeForm';

export const metadata: Metadata = {
  title: 'Create Recipe',
};

export default function CreateRecipePage() {
  return (
    <section className="grid gap-6">
      <PageTitle title="Create Recipe" />

      <RecipeForm type="Create" />
    </section>
  );
}
