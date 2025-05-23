import { Metadata } from 'next';

import Search from '@/components/base/Search';
import RecipeFilters from '@/components/modules/recipes/RecipeFilters';

import { PageProps } from '@/types';

import AllRecipesList from './AllRecipesList';

export const metadata: Metadata = {
  title: 'Recipes',
};

export default function RecipesPage({ params, searchParams }: PageProps) {
  return (
    <section className="wrapper flex h-full flex-1 flex-col gap-6">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-[400px]">
            <Search placeholder="Search recipes..." pathPattern="/recipes/:page" />
          </div>

          <RecipeFilters pathPattern="/recipes/:page" />
        </div>
      </div>

      <AllRecipesList params={params} searchParams={searchParams} />
    </section>
  );
}
