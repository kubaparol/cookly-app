import { PlusCircle, ScrollText } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import Search from '@/components/base/Search';
import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import { Button } from '@/components/ui/button';

import { PageProps } from '@/types';

import MyRecipesList from './MyRecipesList';

export const metadata: Metadata = {
  title: 'My Recipes',
};

export default function ExamplePage({ params, searchParams }: PageProps) {
  return (
    <PageWrapper
      title="Recipe Collection"
      description="View and manage all your created recipes. Click on a recipe actions to see more details."
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.myRecipes, label: 'My Recipes', isCurrent: true },
      ]}
      icon={<ScrollText className="text-muted-foreground" />}
      actions={
        <Button asChild size="sm">
          <Link href={ProjectUrls.createRecipe}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New
          </Link>
        </Button>
      }>
      <section className="flex h-full flex-1 flex-col gap-6 pb-8">
        <div className="space-y-4">
          <div className="w-full sm:max-w-xs">
            <Search placeholder="Search recipes..." pathPattern="/my-recipes/:page" />
          </div>

          <MyRecipesList params={params} searchParams={searchParams} />
        </div>
      </section>
    </PageWrapper>
  );
}
