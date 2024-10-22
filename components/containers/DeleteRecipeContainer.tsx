import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { useState } from 'react';

import { deleteRecipe } from '@/db';

import { AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface DeleteRecipeContainerProps {
  id: string | null;
}

export default function DeleteRecipeContainer(props: DeleteRecipeContainerProps) {
  const { id } = props;

  const [isOpen, setIsOpen] = useState(id ? true : false);

  const deleteHandler = async () => {
    if (!id) return;

    return await deleteRecipe(id);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You&apos;re about to delete an recipe</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this recipe?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={deleteHandler}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
