'use client';

import { Loader2 } from 'lucide-react';
import { PropsWithChildren, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { ServerActionResponse } from '@/types';

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
  onFormSubmit: () => Promise<ServerActionResponse>;
}

export default function DeleteRecipeForm(props: DeleteRecipeFormProps) {
  const { button, children, onFormSubmit } = props;

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const deleteHandler = () => {
    startTransition(async () => {
      const result = await onFormSubmit();

      if (result.success) {
        toast.success('Recipe deleted successfully');
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <form action={() => setIsOpen(true)} className="w-full">
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
