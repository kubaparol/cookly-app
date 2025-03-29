import { Metadata } from 'next';

import Search from '@/components/base/Search';
import Filters from '@/components/modules/recipes/Filters';

import { PageProps } from '@/types';

import MyRecipesList from './MyRecipesList';

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

      <MyRecipesList searchParams={searchParams} />
    </section>
  );
}
