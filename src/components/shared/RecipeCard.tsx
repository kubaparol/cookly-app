import { Edit, Eye, Trash } from 'lucide-react';
import { ChefHat, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

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
    <Card className="group flex h-full flex-col overflow-hidden border-2 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} picture`}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <h3 className="mb-3 line-clamp-2 text-xl font-semibold">{title}</h3>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {dietaryTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
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
                variant="outline"
                size="sm"
                className="flex min-w-[100px] flex-1 items-center justify-center gap-2 transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex min-w-[100px] flex-1 items-center justify-center gap-2 border-destructive/30 text-destructive transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground">
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </>
          )}
          <Link
            href={`/recipes/${id}`}
            target={openInNewTab ? '_blank' : undefined}
            className={`${isAuthor ? 'min-w-[100px] flex-1' : 'w-full'}`}>
            <Button
              size="sm"
              className="flex w-full items-center justify-center gap-2 bg-primary transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
              <Eye className="h-4 w-4" />
              <span>View recipe</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
