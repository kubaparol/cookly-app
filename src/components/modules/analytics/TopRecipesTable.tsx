'use client';

import { AlertTriangle, ArrowUpDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ProjectUrls } from '@/constants';

import { TopRecipe } from '@/db/actions/analytics/get-top-performing-recipes';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type TopRecipesTableProps = {
  recipes: TopRecipe[];
};

export function TopRecipesTable({ recipes }: TopRecipesTableProps) {
  const [sortColumn, setSortColumn] = useState('views');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...recipes].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <Table className="min-w-[750px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Recipe</TableHead>

          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('views')}
              className="-ml-3 h-8 data-[state=open]:bg-accent">
              <span>Views</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>

          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('saves')}
              className="-ml-3 h-8 data-[state=open]:bg-accent">
              <span>Saves</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>

          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('comments')}
              className="-ml-3 h-8 data-[state=open]:bg-accent">
              <span>Comments</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>

          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort('rating')}
              className="-ml-3 h-8 data-[state=open]:bg-accent">
              <span>Rating</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>

          <TableHead className="w-[100px]">Trend</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-72 text-center">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <AlertTriangle className="mb-2 h-8 w-8" />
                <p>No published recipes found</p>
                <p className="text-sm">
                  Publish your recipes to see their performance analytics here
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          sortedData.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col py-3">
                  <Link
                    href={ProjectUrls.recipe(recipe.id)}
                    className="flex items-center hover:underline">
                    {recipe.title}
                    <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                  </Link>
                </div>
              </TableCell>

              <TableCell>{recipe.views.toLocaleString()}</TableCell>

              <TableCell>{recipe.saves.toLocaleString()}</TableCell>

              <TableCell>{recipe.comments}</TableCell>

              <TableCell>{recipe.rating.toFixed(1)}/5.0</TableCell>

              <TableCell
                className={recipe.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {recipe.trend}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
