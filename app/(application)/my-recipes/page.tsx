import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { ProjectUrls } from '@/constants';

import PageTitle from '@/components/base/PageTitle';
import Search from '@/components/base/Search';
import MyRecipesContainer from '@/components/containers/MyRecipesContainer';
import { RecipesSkeleton } from '@/components/shared/skeletons';
import { Button } from '@/components/ui/button';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'My Recipes',
};

export default async function RecipesPage(props: PageProps) {
  return (
    <section className="flex h-full flex-1 flex-col gap-10 pb-8">
      <header className="grid gap-3">
        <PageTitle title="My Recipes" />

        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-8">
          <Search placeholder="Search recipes..." />

          <Button asChild className="w-full sm:w-fit">
            <Link href={ProjectUrls.createRecipe} className="gap-3">
              Create Recipe
              <PlusIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </header>

      <Suspense fallback={<RecipesSkeleton />}>
        <MyRecipesContainer query={props.searchParams.query as string} />
      </Suspense>
    </section>
  );
}
