'use server';

import { currentUser } from '@clerk/nextjs/server';
import { desc, eq, inArray } from 'drizzle-orm';

import { handleError } from '@/utils';

import { comments, recipes } from '@/db';
import { db } from '@/db/drizzle';

export async function getReceivedComments() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    // First, get all recipes created by the current user
    const userRecipes = await db.query.recipes.findMany({
      where: eq(recipes.authorId, user.id),
      columns: {
        id: true,
      },
    });

    const recipeIds = userRecipes.map((recipe) => recipe.id);

    // If user has no recipes, return empty array
    if (recipeIds.length === 0) {
      return {
        success: true,
        data: [],
      };
    }

    // Get all comments on the user's recipes
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
      },
      orderBy: desc(comments.createdAt),
    });

    return {
      success: true,
      data: receivedComments.map((comment) => ({
        ...comment,
        isReplied: false,
      })),
    };
  } catch (error) {
    handleError(error);
  }
}
