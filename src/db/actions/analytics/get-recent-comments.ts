'use server';

import { sql } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments, recipes, users } from '@/db/schema';

export interface RecentComment {
  id: string;
  author: string;
  authorAvatar: string | null;
  recipe: {
    id: string;
    title: string | null;
  };
  content: string;
  rating: number;
  createdAt: Date;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export async function getRecentComments(
  period: string = '30days',
): Promise<RecentComment[] | undefined> {
  try {
    const intervalSQL =
      period === '7days'
        ? sql`interval '7 days'`
        : period === '30days'
          ? sql`interval '30 days'`
          : sql`interval '365 days'`;

    const result = await db
      .select({
        id: comments.id,
        author: sql<string>`${users.firstName}`,
        authorAvatar: users.imageUrl,
        recipeId: recipes.id,
        recipeTitle: recipes.title,
        content: comments.content,
        rating: comments.rating,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .innerJoin(users, sql`${comments.authorId} = ${users.clerkId}`)
      .innerJoin(recipes, sql`${comments.recipeId} = ${recipes.id}`)
      .where(sql`${comments.createdAt} > now() - ${intervalSQL}`)
      .orderBy(sql`${comments.createdAt} DESC`)
      .limit(5);

    return result.map((comment) => ({
      ...comment,
      recipe: {
        id: comment.recipeId,
        title: comment.recipeTitle || 'Untitled Recipe',
      },
      sentiment: getSentimentFromRating(comment.rating),
    }));
  } catch (error) {
    handleError(error);
    return undefined;
  }
}

function getSentimentFromRating(rating: number): 'positive' | 'neutral' | 'negative' {
  if (rating >= 4) return 'positive';
  if (rating === 3) return 'neutral';
  return 'negative';
}
