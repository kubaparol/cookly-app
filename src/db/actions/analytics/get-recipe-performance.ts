'use server';

import { eq, sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments } from '@/db/schema/comments';
import { favorites } from '@/db/schema/favorites';
import { recipes } from '@/db/schema/recipes';
import { views } from '@/db/schema/views';

export interface RecipePerformance {
  id: string;
  title: string;
  imageUrl: string;
  views: number;
  saves: number;
  comments: number;
  rating: number;
  trend: string;
}

export async function getRecipePerformance(
  period: string = '30days',
  sort: string = 'views',
): Promise<RecipePerformance[]> {
  try {
    const intervalSQL =
      period === '7days'
        ? sql`interval '7 days'`
        : period === '30days'
          ? sql`interval '30 days'`
          : period === '90days'
            ? sql`interval '90 days'`
            : period === 'year'
              ? sql`interval '365 days'`
              : sql`interval '9999 days'`;

    const viewStats = await db
      .select({
        recipeId: views.recipeId,
        currentViews: sql<number>`count(*) filter (where ${views.createdAt} > now() - ${intervalSQL})`,
        previousViews: sql<number>`count(*) filter (where ${views.createdAt} between now() - ${intervalSQL} * 2 and now() - ${intervalSQL})`,
      })
      .from(views)
      .groupBy(views.recipeId);

    const performingRecipes = await db
      .select({
        id: recipes.id,
        title: recipes.title,
        imageUrl: recipes.imageUrl,
        averageRating: recipes.averageRating,
        savesCount: sql<number>`count(distinct ${favorites.id})`,
        commentsCount: sql<number>`count(distinct ${comments.id})`,
      })
      .from(recipes)
      .leftJoin(favorites, eq(favorites.recipeId, recipes.id))
      .leftJoin(comments, eq(comments.recipeId, recipes.id))
      .where(eq(recipes.status, 'published'))
      .groupBy(recipes.id);

    let sortedRecipes = performingRecipes;

    switch (sort) {
      case 'views':
        sortedRecipes = sortedRecipes.sort((a, b) => {
          const aViews = viewStats.find((stat) => stat.recipeId === a.id)?.currentViews || 0;
          const bViews = viewStats.find((stat) => stat.recipeId === b.id)?.currentViews || 0;
          return bViews - aViews;
        });
        break;
      case 'saves':
        sortedRecipes = sortedRecipes.sort((a, b) => b.savesCount - a.savesCount);
        break;
      case 'comments':
        sortedRecipes = sortedRecipes.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      case 'rating':
        sortedRecipes = sortedRecipes.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
        );
        break;
      case 'newest':
        break;
    }

    sortedRecipes = sortedRecipes.slice(0, 6);

    return sortedRecipes.map((recipe) => {
      const stats = viewStats.find((stat) => stat.recipeId === recipe.id);
      const currentViews = stats?.currentViews || 0;
      const previousViews = stats?.previousViews || 0;

      let trend: string;
      if (previousViews === 0 && currentViews === 0) {
        trend = '0%';
      } else if (previousViews === 0 && currentViews > 0) {
        trend = '+100%';
      } else if (currentViews === 0 && previousViews > 0) {
        trend = '-100%';
      } else {
        const percentageChange = ((currentViews - previousViews) / previousViews) * 100;
        const cappedChange = Math.min(Math.max(percentageChange, -100), 100);
        trend = `${cappedChange >= 0 ? '+' : ''}${cappedChange.toFixed(1)}%`;
      }

      const formattedRating = (recipe.averageRating || 0).toFixed(1);

      return {
        id: recipe.id,
        title: recipe.title || 'Untitled Recipe',
        imageUrl: recipe.imageUrl || '',
        views: currentViews,
        saves: recipe.savesCount,
        comments: recipe.commentsCount,
        rating: parseFloat(formattedRating),
        trend,
      };
    });
  } catch (error) {
    handleError(error);
    return [];
  }
}
