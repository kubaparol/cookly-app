'use client';

import {
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import { RecipeStatus } from '@/db';

import { StarRating } from '@/components/base/StarRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface UserRecipesTableProps {
  recipes: {
    id: string;
    title: string;
    imageUrl: string;
    averageRating: number;
    status: RecipeStatus;
    updatedAt: Date;
  }[];
  hasSearchTerm: boolean;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return (
        <Badge
          variant="outline"
          className="border border-green-400/30 bg-green-400/10 text-green-600 dark:border-green-300/50 dark:bg-green-300/20 dark:text-green-300">
          Published
        </Badge>
      );
    case 'draft':
      return (
        <Badge
          variant="outline"
          className="border border-amber-400/30 bg-amber-400/10 text-amber-600 dark:border-amber-300/50 dark:bg-amber-300/20 dark:text-amber-300">
          Draft
        </Badge>
      );
    case 'archived':
      return (
        <Badge
          variant="outline"
          className="border-gray-400/30 bg-gray-400/10 text-gray-600 dark:border-gray-300/50 dark:bg-gray-300/20 dark:text-gray-300">
          Archived
        </Badge>
      );
    default:
      return null;
  }
};

export function UserRecipesTable({ recipes, hasSearchTerm }: UserRecipesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>

            <TableHead>
              <div className="flex cursor-pointer items-center" onClick={() => {}}>
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>

            <TableHead className="hidden lg:table-cell">
              <div className="flex cursor-pointer items-center" onClick={() => {}}>
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>

            <TableHead className="hidden lg:table-cell">
              <div className="flex cursor-pointer items-center" onClick={() => {}}>
                Last Updated
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>

            {/* <TableHead className="hidden xl:table-cell">
              <div className="flex cursor-pointer items-center" onClick={() => {}}>
                Stats
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead> */}

            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recipes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-72 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <AlertTriangle className="mb-2 h-8 w-8" />
                  <p>No recipes found</p>
                  {hasSearchTerm && (
                    <p className="text-sm">Try adjusting your search term or create a new recipe</p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            recipes.map((recipe) => (
              <TableRow
                key={recipe.id}
                className={cn(recipe.status === 'archived' && 'opacity-60')}>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="font-medium">{recipe.title}</div>
                  <div className="mt-1 flex items-center">
                    <StarRating rating={recipe.averageRating} size="sm" />
                    <span className="ml-1 text-xs text-muted-foreground">
                      {recipe.averageRating.toFixed(1)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  {getStatusBadge(recipe.status)}
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      {new Date(recipe.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>

                {/* <TableCell className="hidden xl:table-cell">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs">
                      <Eye className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      {recipe.views || 0}
                    </div>
                    <div className="flex items-center text-xs">
                      <Bookmark className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      {recipe.saves || 0}
                    </div>
                  </div>
                </TableCell> */}

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuItem asChild>
                        <Link href={ProjectUrls.recipe(recipe.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href={ProjectUrls.editRecipe(recipe.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
