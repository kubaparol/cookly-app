import { notFound } from 'next/navigation';

import { getOneRecipe } from '@/db';

import RecipeForm from '../forms/RecipeForm';

interface RecipeFormContainerProps {
  id: string;
}

export default async function RecipeFormContainer(props: RecipeFormContainerProps) {
  const { id } = props;

  const recipe = await getOneRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <RecipeForm
      id={id}
      type="Update"
      defaultValues={{
        title: recipe?.title || '',
        description: recipe?.description || undefined,
        imageUrl: recipe?.imageUrl || '',
        ingredients: recipe?.ingredients || [],
        steps: recipe?.steps || [],
      }}
    />
  );
}
