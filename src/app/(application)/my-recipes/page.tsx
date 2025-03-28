import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import Search from '@/components/base/Search';
import Filters from '@/components/modules/recipes/Filters';
import RecipesList from '@/components/modules/recipes/RecipesList';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'My Recipes',
};

export default function RecipesPage({ searchParams }: PageProps) {
  return (
    <section className="flex h-full flex-1 flex-col gap-6 pb-8">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-[400px]">
            <Search placeholder="Search recipes..." />
          </div>

          <Filters />
        </div>
      </div>

      <RecipesList
        searchParams={searchParams}
        isPersonal={true}
        createRecipeUrl={ProjectUrls.createRecipe}
      />
    </section>
  );
}
