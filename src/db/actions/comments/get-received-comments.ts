'use server';

import { currentUser } from '@clerk/nextjs/server';
import { desc, eq, inArray } from 'drizzle-orm';

import { handleError } from '@/utils';

import { comments, commentsReplies, recipes } from '@/db';
import { db } from '@/db/drizzle';

export async function getReceivedComments() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const userRecipes = await db.query.recipes.findMany({
      where: eq(recipes.authorId, user.id),
      columns: {
        id: true,
      },
    });

    const recipeIds = userRecipes.map((recipe) => recipe.id);

    if (recipeIds.length === 0) {
      return {
        success: true,
        data: [],
      };
    }

    const receivedComments = await db.query.comments.findMany({
      where: inArray(comments.recipeId, recipeIds),
      with: {
        recipe: {
          columns: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
        author: {
          columns: {
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
        replies: {
          where: eq(commentsReplies.authorId, user.id),
          columns: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: desc(comments.createdAt),
    });

    return {
      success: true,
      data: receivedComments,
    };
  } catch (error) {
    handleError(error);
  }
}
