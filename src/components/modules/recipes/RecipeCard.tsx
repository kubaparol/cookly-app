import { Edit, Eye, Trash } from 'lucide-react';
import { ChefHat, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import DeleteRecipeWrapper from './DeleteRecipeWrapper';

const MAX_DIETARY_TAGS = 2;

interface RecipeCardProps {
  id: string;
  title: string;
  imageUrl: string;
  cookingTime?: number;
  difficulty?: string;
  dietaryTags?: string[];
  isAuthor?: boolean;
  openInNewTab?: boolean;
}

export function RecipeCard({
  id,
  title,
  imageUrl,
  cookingTime = 0,
  difficulty = 'medium',
  dietaryTags = [],
  isAuthor = false,
  openInNewTab = false,
}: RecipeCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-2 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} picture`}
          fill
          className="h-full w-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="mb-3 line-clamp-2 text-xl font-semibold">{title}</h3>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {dietaryTags.slice(0, MAX_DIETARY_TAGS).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {dietaryTags.length > MAX_DIETARY_TAGS && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="cursor-pointer text-xs">
                    + {dietaryTags.length - MAX_DIETARY_TAGS} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1 border bg-card p-2">
                  {dietaryTags.slice(MAX_DIETARY_TAGS).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {cookingTime > 0 && (
            <div className="grid grid-cols-[auto,_1fr] items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span>{cookingTime} min</span>
            </div>
          )}

          {difficulty && (
            <div className="grid grid-cols-[auto,_1fr] items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <ChefHat className="h-3.5 w-3.5" />
              </div>
              <span className="capitalize">{difficulty}</span>
            </div>
          )}
        </div>
      </div>

      <CardFooter className="gap-0 p-4 pt-0">
        <div className="flex w-full flex-wrap items-center gap-3">
          {isAuthor && (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex min-w-[100px] flex-1 items-center justify-center gap-2 transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground">
                <Link href={ProjectUrls.editRecipe(id)}>
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </Button>

              <DeleteRecipeWrapper
                id={id}
                button={{
                  variant: 'outline',
                  size: 'sm',
                  className:
                    'flex w-full min-w-[100px] flex-1 items-center justify-center gap-2 border-destructive/30 text-destructive transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground',
                }}>
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </DeleteRecipeWrapper>
            </>
          )}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex w-full items-center justify-center gap-2 transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground">
            <Link href={ProjectUrls.recipe(id)} target={openInNewTab ? '_blank' : undefined}>
              <Eye className="h-4 w-4" />
              <span>View</span>
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
