import { Metadata } from 'next';

import RecipeForm from '@/components/forms/recipe/RecipeForm';

export const metadata: Metadata = {
  title: 'Create Recipe',
};

export default function CreateRecipePage() {
  return (
    <section className="flex h-full flex-col gap-6">
      <RecipeForm type="Create" />
    </section>
  );
}
