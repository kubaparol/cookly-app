'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteRecipe } from '@/db';

import { AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface DeleteRecipeContainerProps {
  id: string | null;
  isOpen: boolean;
}

export default function DeleteRecipeContainer(props: DeleteRecipeContainerProps) {
  const { id, isOpen } = props;

  const router = useRouter();
  const pathname = usePathname();

  const closeHandler = () => {
    router.replace(pathname);
  };

  const deleteHandler = async () => {
    if (!id) return;

    return await deleteRecipe(id);
  };

  return (
    <AlertDialog open={true} onOpenChange={closeHandler}>
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
