'use client';

import { useUser } from '@clerk/nextjs';
import { Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import { addToFavorites, removeFromFavorites } from '@/db';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AddToFavoritesButtonProps {
  recipeId: string;
  isFavorite: boolean;
}

export function AddToFavoritesButton({ recipeId, isFavorite }: AddToFavoritesButtonProps) {
  const { user, isLoaded } = useUser();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToFavorites = async () => {
    if (!isLoaded || !user) return;

    setIsAdding(true);

    startTransition(async () => {
      const result = await addToFavorites(recipeId);

      if (result.success) {
        toast.success('Recipe added to favorites');
      } else {
        toast.error(result.message);
      }

      setIsAdding(false);
    });
  };

  const handleRemoveFromFavorites = async (e: React.MouseEvent<HTMLButtonElement>) => {
    avoidDefaultDomBehavior(e);

    if (!isLoaded || !user) return;

    setIsRemoving(true);

    startTransition(async () => {
      const result = await removeFromFavorites(recipeId);

      if (result.success) {
        toast.success('Recipe removed from favorites');
        setShowConfirmDialog(false);
      } else {
        toast.error(result.message);
      }

      setIsRemoving(false);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    avoidDefaultDomBehavior(e);

    if (!isLoaded || !user) return;

    if (isFavorite) {
      setShowConfirmDialog(true);
    } else {
      handleAddToFavorites();
    }
  };

  const avoidDefaultDomBehavior = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              disabled={isAdding || isRemoving}
              onClick={handleClick}
              className={cn(
                'absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-all',
                user && 'hover:bg-background',
              )}>
              {isAdding ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Heart
                  className={cn(
                    'size-5',
                    !isLoaded || !user
                      ? 'cursor-not-allowed text-muted-foreground/40'
                      : isFavorite
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-muted-foreground',
                  )}
                />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent>
            {!isLoaded || !user ? (
              <>
                <Link href={ProjectUrls.signIn} className="text-xs underline">
                  Log in
                </Link>{' '}
                to add favorites
              </>
            ) : (
              <p className="text-xs">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div onClick={avoidDefaultDomBehavior}>
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from favorites</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this recipe from your favorites?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>

              <AlertDialogAction disabled={isRemoving} onClick={handleRemoveFromFavorites}>
                {isRemoving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  'Remove'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
