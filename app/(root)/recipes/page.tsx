import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';

import { getAllRecipes } from '@/db';

import Search from '@/components/base/Search';
import RecipeCard from '@/components/shared/RecipeCard';
import StatusCard from '@/components/shared/StatusCard';
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
        <div className="grid gap-10">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
            {recipes?.map((recipe, index) => (
              <li key={index}>
                <RecipeCard
                  id={recipe.id}
                  title={recipe.title}
                  imageUrl={recipe.imageUrl}
                  isAuthor={user?.id === recipe.authorId}
                />
              </li>
            ))}
          </ul>

          {/* <Pagination totalPages={10} className="mx-auto" /> */}
        </div>
      )}
    </section>
  );
}
