'use server';

import { sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments } from '@/db/schema';

export interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
}

export async function getSentiment(period: string = '30days'): Promise<SentimentStats | undefined> {
  try {
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
      .where(sql`${comments.createdAt} > now() - ${intervalSQL}`);

    const stats = result[0];
    const total = stats.total || 1;

    return {
      positive: Math.round((stats.positive / total) * 100),
      neutral: Math.round((stats.neutral / total) * 100),
      negative: Math.round((stats.negative / total) * 100),
    };
  } catch (error) {
    handleError(error);
    return undefined;
  }
}
