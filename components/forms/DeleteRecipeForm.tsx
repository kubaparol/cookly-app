'use client';

import { Loader2 } from 'lucide-react';
import { PropsWithChildren, useState, useTransition } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button, ButtonProps } from '../ui/button';

export interface DeleteRecipeFormProps extends PropsWithChildren {
  button: Omit<ButtonProps, 'type'>;
  onFormSubmit: () => Promise<void>;
}

export default function DeleteRecipeForm(props: DeleteRecipeFormProps) {
  const { button, children, onFormSubmit } = props;

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const deleteHandler = () => {
    startTransition(async () => await onFormSubmit());
  };

  return (
    <>
      <form action={() => setIsOpen(true)}>
        <Button {...button} type="submit">
          {children}
        </Button>
      </form>

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
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={deleteHandler} disabled={isPending}>
                Delete
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
