'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import { db } from '@/db/drizzle';
import { comments } from '@/db/schema';

import { CommentFormValues } from '@/components/forms/CommentForm';

import { ServerActionResponse } from '@/types';

import { updateRecipeAverageScore } from '../recipe';

export async function addComment(
  comment: CommentFormValues & { recipeId: string },
): Promise<ServerActionResponse> {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db.insert(comments).values({
      content: comment.comment,
      rating: comment.rating,
      recipeId: comment.recipeId,
      authorId: user.id,
    });

    await updateRecipeAverageScore(comment.recipeId);

    revalidatePath(ProjectUrls.recipes);
    revalidatePath(ProjectUrls.myRecipes);
    revalidatePath(ProjectUrls.recipe(comment.recipeId));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add comment: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
