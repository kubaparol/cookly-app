import { Metadata } from 'next';

import { ProjectUrls, appPageTitles } from '@/constants';

import PageTitle from '@/components/base/PageTitle';
import RecipeForm from '@/components/forms/RecipeForm';

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.createRecipe],
};

export default function CreateRecipePage() {
  return (
    <section className="grid gap-6">
      <PageTitle />

      <RecipeForm type="Create" />
    </section>
  );
}
