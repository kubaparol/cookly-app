'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq, inArray, sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments, recipes } from '@/db/schema';

export interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
}

export async function getSentiment(period: string = '30days'): Promise<SentimentStats | undefined> {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        positive: 0,
        neutral: 0,
        negative: 0,
      };
    }

    // Get user's recipe ids
    const userRecipes = await db.query.recipes.findMany({
      where: eq(recipes.authorId, user.id),
      columns: {
        id: true,
      },
    });

    const recipeIds = userRecipes.map((recipe) => recipe.id);

    if (recipeIds.length === 0) {
      return {
        positive: 0,
        neutral: 0,
        negative: 0,
      };
    }

    const intervalSQL =
      period === '7days'
        ? sql`interval '7 days'`
        : period === '30days'
          ? sql`interval '30 days'`
          : sql`interval '365 days'`;

    const result = await db
      .select({
        total: sql<number>`count(*)`,
        positive: sql<number>`count(*) filter (where ${comments.rating} >= 4)`,
        neutral: sql<number>`count(*) filter (where ${comments.rating} = 3)`,
        negative: sql<number>`count(*) filter (where ${comments.rating} <= 2)`,
      })
      .from(comments)
      .where(
        and(
          sql`${comments.createdAt} > now() - ${intervalSQL}`,
          inArray(comments.recipeId, recipeIds),
        ),
      );

    const stats = result[0];
    const total = stats.total || 1;

    return {
      positive: Math.round((stats.positive / total) * 100),
      neutral: Math.round((stats.neutral / total) * 100),
      negative: Math.round((stats.negative / total) * 100),
    };
  } catch (error) {
    handleError(error);
    return {
      positive: 0,
      neutral: 0,
      negative: 0,
    };
  }
}
