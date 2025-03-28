import { deleteRecipe } from '@/db';

import DeleteRecipeForm, { DeleteRecipeFormProps } from '@/components/forms/DeleteRecipeForm';

interface DeleteRecipeContainerProps extends Omit<DeleteRecipeFormProps, 'onFormSubmit'> {
  id: string;
}

export default function DeleteRecipeWrapper(props: DeleteRecipeContainerProps) {
  const { id, button, children } = props;

  const deleteRecipeHandler = async () => {
    'use server';

    return await deleteRecipe(id);
  };

  return (
    <DeleteRecipeForm button={button} onFormSubmit={deleteRecipeHandler}>
      {children}
    </DeleteRecipeForm>
  );
}
