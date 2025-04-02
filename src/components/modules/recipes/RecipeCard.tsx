import { Users } from 'lucide-react';
import { ChefHat, Clock, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { StarRating } from '@/components/base/StarRating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { AddToFavoritesButton } from './AddToFavoritesButton';

const MAX_DIETARY_TAGS = 2;
interface RecipeCardProps {
  id: string;
  title: string | null;
  description?: string;
  imageUrl: string | null;
  cookingTime?: number;
  difficulty: string | null;
  servings: number | null;
  dietaryTags: string[] | null;
  averageRating?: number;
  cuisineType: string | null;
  isAuthor?: boolean;
  openInNewTab?: boolean;
  isFavorite?: boolean;
}

export function RecipeCard({
  id,
  title,
  description = '',
  imageUrl,
  cookingTime = 0,
  difficulty = 'medium',
  servings = 0,
  dietaryTags = [],
  averageRating = 0,
  cuisineType = '',
  isFavorite = false,
}: RecipeCardProps) {
  return (
    <Link href={ProjectUrls.recipe(id)}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} picture`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <AddToFavoritesButton recipeId={id} isFavorite={isFavorite} />

          {cuisineType && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="outline" className="border-0 bg-background/80 backdrop-blur-sm">
                {cuisineType}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-lg font-semibold group-hover:underline">
              {title || 'Untitled Recipe'}
            </h3>

            {description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
            )}

            <div className="flex items-center gap-1">
              <StarRating rating={averageRating} size="sm" />
              <span className="text-xs text-muted-foreground">{averageRating.toFixed(1)}</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
              {cookingTime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{cookingTime} min</span>
                </div>
              )}

              {difficulty && (
                <div className="flex items-center gap-1">
                  <ChefHat className="h-3.5 w-3.5" />
                  <span>{difficulty}</span>
                </div>
              )}

              {servings && servings > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{servings} servings</span>
                </div>
              )}
            </div>

            {dietaryTags && dietaryTags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {dietaryTags.slice(0, MAX_DIETARY_TAGS).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="h-5 border border-green-400/30 bg-green-400/10 px-1.5 py-0 text-[10px] text-green-600 dark:border-green-300/50 dark:bg-green-300/20 dark:text-green-300">
                    #{tag}
                  </Badge>
                ))}
                {dietaryTags.length > MAX_DIETARY_TAGS && (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="h-5 border-muted bg-muted/50 px-1.5 py-0 text-[10px] text-muted-foreground">
                          +{dietaryTags.length - MAX_DIETARY_TAGS} more
                        </Badge>
                      </TooltipTrigger>

                      <TooltipContent className="flex flex-col gap-1 border bg-card p-2">
                        {dietaryTags.slice(MAX_DIETARY_TAGS).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="h-5 border border-green-400/30 bg-green-400/10 px-1.5 py-0 text-[10px] text-green-600 dark:border-green-300/50 dark:bg-green-300/20 dark:text-green-300">
                            #{tag}
                          </Badge>
                        ))}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
