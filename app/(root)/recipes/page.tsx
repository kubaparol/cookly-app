import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { getAllRecipes } from '@/db';

import Search from '@/components/base/Search';
import AllRecipesContainer from '@/components/containers/AllRecipesContainer';
import StatusCard from '@/components/shared/StatusCard';
import { AllRecipesSkeleton } from '@/components/shared/skeletons';
import { Separator } from '@/components/ui/separator';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Recipes',
};

export default async function RecipesPage(props: PageProps) {
  const query = props.searchParams.query as string;

  const recipes = await getAllRecipes({ query });

  const user = await currentUser();

  return (
    <section className="flex flex-1 flex-col gap-6">
      <div className="max-w-md">
        <Search placeholder="Search recipes..." />
      </div>

      <Separator />

      {recipes?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <StatusCard
            type="alert"
            title="Recipes not found"
            message="Sorry, but we could not find the recipes you are looking for."
          />
        </div>
      ) : (
        <Suspense fallback={<AllRecipesSkeleton />}>
          <AllRecipesContainer query={props.searchParams.query as string} />
        </Suspense>
      )}
    </section>
  );
}
