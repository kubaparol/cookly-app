'use server';

import { sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments, favorites } from '@/db/schema';

export interface EngagementStats {
  comments: {
    count: number;
    trend: string;
  };
  saves: {
    count: number;
    trend: string;
  };
}

export async function getEngagements(
  period: string = '30days',
): Promise<EngagementStats | undefined> {
  try {
    const intervalSQL =
      period === '7days'
        ? sql`interval '7 days'`
        : period === '30days'
          ? sql`interval '30 days'`
          : sql`interval '365 days'`;

    const commentStats = await db
      .select({
        currentCount: sql<number>`count(*) filter (where ${comments.createdAt} > now() - ${intervalSQL})`,
        previousCount: sql<number>`count(*) filter (where ${comments.createdAt} between now() - ${intervalSQL} * 2 and now() - ${intervalSQL})`,
      })
      .from(comments);

    const saveStats = await db
      .select({
        currentCount: sql<number>`count(*) filter (where ${favorites.createdAt} > now() - ${intervalSQL})`,
        previousCount: sql<number>`count(*) filter (where ${favorites.createdAt} between now() - ${intervalSQL} * 2 and now() - ${intervalSQL})`,
      })
      .from(favorites);

    const calculateTrend = (current: number, previous: number): string => {
      if (previous === 0 && current === 0) return '0%';
      if (previous === 0) return '+100%';
      const percentageChange = ((current - previous) / previous) * 100;
      const cappedPercentage = Math.max(Math.min(percentageChange, 100), -100);
      return `${cappedPercentage >= 0 ? '+' : ''}${cappedPercentage.toFixed(1)}%`;
    };

    return {
      comments: {
        count: commentStats[0].currentCount,
        trend: calculateTrend(commentStats[0].currentCount, commentStats[0].previousCount),
      },
      saves: {
        count: saveStats[0].currentCount,
        trend: calculateTrend(saveStats[0].currentCount, saveStats[0].previousCount),
      },
    };
  } catch (error) {
    handleError(error);
    return undefined;
  }
}
