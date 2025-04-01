'use client';

import dayjs from 'dayjs';
import {
  AlertTriangle,
  Archive,
  ArchiveRestore,
  ArrowUpDown,
  Bookmark,
  Calendar,
  CircleCheck,
  Edit,
  ExternalLink,
  Eye,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import { RecipeStatus, deleteRecipe, setRecipeStatus } from '@/db';

import { StarRating } from '@/components/base/StarRating';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
    viewsCount: number;
    favoritesCount: number;
    commentsCount: number;
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSetStatusDialog, setShowSetStatusDialog] = useState<
    'publish' | 'draft' | 'archive' | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const handleDeleteRecipe = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await deleteRecipe(id);
      if (result.success) {
        toast.success('Recipe deleted successfully');
        setShowDeleteDialog(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleSetRecipeStatus = (
    id: string,
    status: RecipeStatus,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await setRecipeStatus(id, status);

      if (result.success) {
        toast.success('Recipe status updated successfully');
        setShowSetStatusDialog(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
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

              <TableHead className="hidden xl:table-cell">
                <div className="flex cursor-pointer items-center" onClick={() => {}}>
                  Stats
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>

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
                      <p className="text-sm">
                        Try adjusting your search term or create a new recipe
                      </p>
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
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
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
                      <Calendar className="mr-2 size-4 text-muted-foreground" />
                      <span className="text-sm">
                        {dayjs(recipe.updatedAt).format('DD.MM.YYYY')}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden xl:table-cell">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm">
                        <Eye className="mr-1 size-4 text-muted-foreground" />
                        {recipe.viewsCount || 0}
                      </div>
                      <div className="flex items-center text-sm">
                        <MessageCircle className="mr-1 size-4 text-muted-foreground" />
                        {recipe.commentsCount}
                      </div>
                      <div className="flex items-center text-sm">
                        <Bookmark className="mr-1 size-4 text-muted-foreground" />
                        {recipe.favoritesCount}
                      </div>
                    </div>
                  </TableCell>

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

                        {recipe.status !== 'archived' && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={ProjectUrls.recipe(recipe.id)} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
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
                          </>
                        )}

                        {recipe.status === 'draft' && (
                          <>
                            <AlertDialog
                              open={showSetStatusDialog === 'publish'}
                              onOpenChange={(open) =>
                                setShowSetStatusDialog(open ? 'publish' : null)
                              }>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <CircleCheck className="mr-2 h-4 w-4" />
                                  Publish
                                </DropdownMenuItem>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will publish the recipe <b>{recipe.title}</b> and
                                    will be visible to the public.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                                  <AlertDialogAction
                                    disabled={isPending}
                                    onClick={(e) =>
                                      handleSetRecipeStatus(recipe.id, 'published', e)
                                    }>
                                    {isPending ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Publishing...
                                      </>
                                    ) : (
                                      'Publish'
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}

                        {recipe.status === 'published' && (
                          <AlertDialog
                            open={showSetStatusDialog === 'draft'}
                            onOpenChange={(open) => setShowSetStatusDialog(open ? 'draft' : null)}>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Archive className="mr-2 h-4 w-4" />
                                Draft
                              </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will set the recipe <b>{recipe.title}</b> to draft
                                  status and you will be able to edit it before publishing it again.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                  disabled={isPending}
                                  onClick={(e) => handleSetRecipeStatus(recipe.id, 'draft', e)}>
                                  {isPending ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Drafting...
                                    </>
                                  ) : (
                                    'Draft'
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}

                        {recipe.status !== 'archived' && (
                          <AlertDialog
                            open={showSetStatusDialog === 'archive'}
                            onOpenChange={(open) =>
                              setShowSetStatusDialog(open ? 'archive' : null)
                            }>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will archive the recipe <b>{recipe.title}</b> and will
                                  not be visible to the public.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                  disabled={isPending}
                                  onClick={(e) => handleSetRecipeStatus(recipe.id, 'archived', e)}>
                                  {isPending ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Archiving...
                                    </>
                                  ) : (
                                    'Archive'
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}

                        {recipe.status === 'archived' && (
                          <AlertDialog
                            open={showSetStatusDialog === 'draft'}
                            onOpenChange={(open) => setShowSetStatusDialog(open ? 'draft' : null)}>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <ArchiveRestore className="mr-2 h-4 w-4" />
                                Restore
                              </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will set the recipe <b>{recipe.title}</b> to draft
                                  status and you will be able to edit it before publishing it again.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                  disabled={isPending}
                                  onClick={(e) => handleSetRecipeStatus(recipe.id, 'draft', e)}>
                                  {isPending ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Restoring...
                                    </>
                                  ) : (
                                    'Restore'
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}

                        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                recipe <b>{recipe.title}</b> and remove its data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                              <AlertDialogAction
                                disabled={isPending}
                                onClick={(e) => handleDeleteRecipe(recipe.id, e)}>
                                {isPending ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  'Delete'
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
