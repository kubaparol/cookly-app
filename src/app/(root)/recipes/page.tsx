import { Metadata } from 'next';
import { Suspense } from 'react';

import Search from '@/components/base/Search';
import AllRecipesContainer from '@/components/containers/AllRecipesContainer';
import { AllRecipesSkeleton } from '@/components/shared/skeletons';
import { Separator } from '@/components/ui/separator';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'Recipes',
};

export default async function RecipesPage(props: PageProps) {
  return (
    <section className="wrapper flex flex-1 flex-col gap-6 !py-6">
      <div className="max-w-md">
        <Search placeholder="Search recipes..." />
      </div>

      <Separator />

      <Suspense fallback={<AllRecipesSkeleton />}>
        <AllRecipesContainer query={props.searchParams?.query as string} />
      </Suspense>
    </section>
  );
}
