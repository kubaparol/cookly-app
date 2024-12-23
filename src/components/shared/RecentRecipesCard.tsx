import { Pencil, PlusIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import DeleteRecipeContainer from '../containers/DeleteRecipeContainer';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type RecentRecipe = {
  id: string;
  imageUrl: string;
  title: string;
};
export interface RecentRecipesCardProps {
  recipes: RecentRecipe[];
}

export default function RecentRecipesCard(props: RecentRecipesCardProps) {
  const { recipes } = props;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Recent Recipes</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between">
        {recipes.length === 0 ? (
          <div className="grid aspect-auto h-[350px] w-full place-items-center">
            <div className="grid gap-3">
              <p className="mt-4 text-center text-sm text-gray-500">
                You haven&apos;t created any recipes yet
              </p>

              <Button asChild size="sm" className="mx-auto w-fit">
                <Link href={ProjectUrls.createRecipe} className="gap-2">
                  Create your first recipe
                  <PlusIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid">
            {recipes.map((recipe, index) => (
              <div
                className={cn(
                  'grid h-full grid-cols-[auto,_1fr,_auto] items-center py-2',
                  index !== 0 && 'border-t',
                )}
                key={index}>
                <div className="relative h-12 w-12">
                  <Image
                    src={recipe.imageUrl}
                    alt={`${recipe.title} picture`}
                    fill
                    className="rounded-full border-gray-200 object-cover shadow-md"
                  />
                </div>

                <div className="ml-4 mr-2 line-clamp-2">
                  <p className="text-ellipsis text-sm font-medium">{recipe.title}</p>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <Button size="icon" variant="outline" asChild>
                    <Link href={ProjectUrls.editRecipe(recipe.id)}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>

                  <DeleteRecipeContainer
                    id={recipe.id}
                    button={{ size: 'icon', variant: 'outline' }}>
                    <Trash2 className="size-4 text-red-600" />
                  </DeleteRecipeContainer>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
