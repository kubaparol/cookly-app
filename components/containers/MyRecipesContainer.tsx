import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { getMyRecipes } from '@/db';

import RecipeCard from '../shared/RecipeCard';

interface MyRecipesContainerProps {
  query?: string;
}

export default async function MyRecipesContainer(props: MyRecipesContainerProps) {
  const { query } = props;

  const recipes = await getMyRecipes({ query });

  const user = await currentUser();

  if (!user) {
    notFound();
  }

  return recipes?.map((recipe, index) => (
    <RecipeCard
      key={index}
      id={recipe.id}
      title={recipe.title}
      imageUrl={recipe.imageUrl}
      isAuthor={user.id === recipe.authorId}
      openInNewTab
    />
  ));
}
