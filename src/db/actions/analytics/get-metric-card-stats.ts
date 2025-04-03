'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq, inArray, sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments, favorites, recipes, views } from '@/db/schema';

export interface AnalyticsData {
  totalViews: number;
  totalSaves: number;
  totalComments: number;
  viewsChange: number;
  savesChange: number;
  commentsChange: number;
}

export async function getAnalytics(period: string = '30days'): Promise<AnalyticsData | undefined> {
  try {
    const user = await currentUser();
    if (!user) throw new Error('User not found');

    const now = new Date();
    const startDate = new Date();
    const previousStartDate = new Date();

    switch (period) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        previousStartDate.setDate(now.getDate() - 14);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        previousStartDate.setDate(now.getDate() - 180);
        break;
      case 'year':
        startDate.setMonth(now.getMonth() - 12);
        previousStartDate.setMonth(now.getMonth() - 24);
        break;
      case '30days':
      default:
        startDate.setDate(now.getDate() - 30);
        previousStartDate.setDate(now.getDate() - 60);
    }

    const userRecipes = await db.query.recipes.findMany({
      where: eq(recipes.authorId, user.id),
      columns: { id: true },
    });

    const recipeIds = userRecipes.map((recipe) => recipe.id);

    if (recipeIds.length === 0) {
      return {
        totalViews: 0,
        totalSaves: 0,
        totalComments: 0,
        viewsChange: 0,
        savesChange: 0,
        commentsChange: 0,
      };
    }

    const currentStats = await db
      .select({
        views: sql<number>`cast(count(distinct ${views.id}) as int)`,
        saves: sql<number>`cast(count(distinct ${favorites.id}) as int)`,
        comments: sql<number>`cast(count(distinct ${comments.id}) as int)`,
      })
      .from(recipes)
      .leftJoin(
        views,
        and(
          eq(views.recipeId, recipes.id),
          sql`${views.createdAt} >= ${startDate} and ${views.createdAt} <= ${now}`,
        ),
      )
      .leftJoin(
        favorites,
        and(
          eq(favorites.recipeId, recipes.id),
          sql`${favorites.createdAt} >= ${startDate} and ${favorites.createdAt} <= ${now}`,
        ),
      )
      .leftJoin(
        comments,
        and(
          eq(comments.recipeId, recipes.id),
          sql`${comments.createdAt} >= ${startDate} and ${comments.createdAt} <= ${now}`,
        ),
      )
      .where(inArray(recipes.id, recipeIds))
      .groupBy(recipes.id)
      .execute();

    const previousStats = await db
      .select({
        views: sql<number>`cast(count(distinct ${views.id}) as int)`,
        saves: sql<number>`cast(count(distinct ${favorites.id}) as int)`,
        comments: sql<number>`cast(count(distinct ${comments.id}) as int)`,
      })
      .from(recipes)
      .leftJoin(
        views,
        and(
          eq(views.recipeId, recipes.id),
          sql`${views.createdAt} >= ${previousStartDate} and ${views.createdAt} < ${startDate}`,
        ),
      )
      .leftJoin(
        favorites,
        and(
          eq(favorites.recipeId, recipes.id),
          sql`${favorites.createdAt} >= ${previousStartDate} and ${favorites.createdAt} < ${startDate}`,
        ),
      )
      .leftJoin(
        comments,
        and(
          eq(comments.recipeId, recipes.id),
          sql`${comments.createdAt} >= ${previousStartDate} and ${comments.createdAt} < ${startDate}`,
        ),
      )
      .where(inArray(recipes.id, recipeIds))
      .groupBy(recipes.id)
      .execute();

    const currentTotals = currentStats.reduce(
      (acc, curr) => ({
        views: acc.views + (curr.views || 0),
        saves: acc.saves + (curr.saves || 0),
        comments: acc.comments + (curr.comments || 0),
      }),
      { views: 0, saves: 0, comments: 0 },
    );

    const previousTotals = previousStats.reduce(
      (acc, curr) => ({
        views: acc.views + (curr.views || 0),
        saves: acc.saves + (curr.saves || 0),
        comments: acc.comments + (curr.comments || 0),
      }),
      { views: 0, saves: 0, comments: 0 },
    );

    const calculateChange = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      totalViews: currentTotals.views,
      totalSaves: currentTotals.saves,
      totalComments: currentTotals.comments,
      viewsChange: calculateChange(currentTotals.views, previousTotals.views),
      savesChange: calculateChange(currentTotals.saves, previousTotals.saves),
      commentsChange: calculateChange(currentTotals.comments, previousTotals.comments),
    };
  } catch (error) {
    handleError(error);
  }
}
