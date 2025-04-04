'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { comments, favorites, recipes } from '@/db/schema';

export type QuickStats = {
  recipesCreated: number;
  savedRecipes: number;
  comments: number;
};

export async function getQuickStats(): Promise<QuickStats | null> {
  try {
    const user = await currentUser();

    if (!user) return null;

    const userRecipes = await db.query.recipes.findMany({
      where: eq(recipes.authorId, user.id),
      columns: {
        id: true,
      },
    });

    const recipesCreated = userRecipes.length;

    const savedRecipesCount = await db.query.favorites.findMany({
      where: eq(favorites.userId, user.id),
      columns: {
        id: true,
      },
    });

    const savedRecipes = savedRecipesCount.length;

    const userComments = await db.query.comments.findMany({
      where: eq(comments.authorId, user.id),
      columns: {
        id: true,
      },
    });

    const commentsCount = userComments.length;

    return {
      recipesCreated,
      savedRecipes,
      comments: commentsCount,
    };
  } catch (error) {
    console.error('Error fetching quick stats:', error);
    return null;
  }
}
