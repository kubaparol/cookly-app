'use client';

import { useUser } from '@clerk/nextjs';
import { Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import { addToFavorites } from '@/db/actions';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AddToFavoritesButtonProps {
  recipeId: string;
  isFavorite: boolean;
}

export function AddToFavoritesButton({ recipeId, isFavorite }: AddToFavoritesButtonProps) {
  const { user, isLoaded } = useUser();

  const [isPending, startTransition] = useTransition();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoaded || !user) return;

    startTransition(async () => {
      const result = await addToFavorites(recipeId);

      if (result.success) {
        toast.success('Recipe added to favorites');
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            disabled={isPending}
            onClick={handleClick}
            className={cn(
              'absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-all',
              user && 'hover:bg-background',
            )}>
            {isPending ? (
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
            <p className="text-xs">Add to favorites</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
