import { deleteRecipe } from '@/db';

import DeleteRecipeForm, { DeleteRecipeFormProps } from '../forms/DeleteRecipeForm';

interface DeleteRecipeContainerProps extends Omit<DeleteRecipeFormProps, 'onFormSubmit'> {
  id: string;
}

export default function DeleteRecipeContainer(props: DeleteRecipeContainerProps) {
  const { id, button, children } = props;

  const deleteRecipeHandler = async () => {
    'use server';

    await deleteRecipe(id);
  };

  return (
    <DeleteRecipeForm button={button} onFormSubmit={deleteRecipeHandler}>
      {children}
    </DeleteRecipeForm>
  );
}
