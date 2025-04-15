'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq, sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments } from '@/db/schema/comments';
import { favorites } from '@/db/schema/favorites';
import { recipes } from '@/db/schema/recipes';
import { views } from '@/db/schema/views';

export interface TopRecipe {
  id: string;
  title: string;
  views: number;
  saves: number;
  comments: number;
  rating: number;
  trend: string;
}

export async function getTopPerformingRecipes(period: string = '30days'): Promise<TopRecipe[]> {
  try {
    const user = await currentUser();

    if (!user) {
      return [];
    }

    const intervalSQL =
      period === '7days'
        ? sql`interval '7 days'`
        : period === '30days'
          ? sql`interval '30 days'`
          : sql`interval '365 days'`;

    const viewStats = await db
      .select({
        recipeId: views.recipeId,
        currentViews: sql<number>`count(*) filter (where ${views.createdAt} > now() - ${intervalSQL})`,
        previousViews: sql<number>`count(*) filter (where ${views.createdAt} between now() - ${intervalSQL} * 2 and now() - ${intervalSQL})`,
      })
      .from(views)
      .groupBy(views.recipeId);

    const topRecipes = await db
      .select({
        id: recipes.id,
        title: recipes.title,
        averageRating: recipes.averageRating,
        savesCount: sql<number>`count(distinct ${favorites.id})`,
        commentsCount: sql<number>`count(distinct ${comments.id})`,
      })
      .from(recipes)
      .leftJoin(favorites, eq(favorites.recipeId, recipes.id))
      .leftJoin(comments, eq(comments.recipeId, recipes.id))
      .where(and(eq(recipes.status, 'published'), eq(recipes.authorId, user.id)))
      .groupBy(recipes.id)
      .orderBy(
        sql`(
          coalesce(${recipes.averageRating}, 0) * 2 + 
          count(distinct ${favorites.id}) + 
          count(distinct ${comments.id})
        ) desc`,
      )
      .limit(6);

    return topRecipes.map((recipe) => {
      const stats = viewStats.find((stat) => stat.recipeId === recipe.id);
      const currentViews = stats?.currentViews || 0;
      const previousViews = stats?.previousViews || 0;

      let trend: string;
      if (previousViews === 0 && currentViews === 0) {
        trend = '0%';
      } else if (previousViews === 0) {
        trend = '+100%';
      } else if (currentViews === 0) {
        trend = '-100%';
      } else {
        const ratio = currentViews / previousViews;
        let percentageChange: number;

        if (ratio > 1) {
          percentageChange = Math.min(Math.log10(ratio) * 100, 100);
        } else {
          percentageChange = ((currentViews - previousViews) / previousViews) * 100;
        }

        trend = `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`;
      }

      return {
        id: recipe.id,
        title: recipe.title || 'Untitled Recipe',
        views: currentViews,
        saves: recipe.savesCount,
        comments: recipe.commentsCount,
        rating: recipe.averageRating || 0,
        trend,
      };
    });
  } catch (error) {
    handleError(error);
    return [];
  }
}
