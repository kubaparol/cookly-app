'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { ProjectUrls } from '@/constants';

import { db } from '@/db/drizzle';
import { commentsReplies } from '@/db/schema';

import { CommentReplyFormValues } from '@/components/forms/CommentReplyForm';

import { ServerActionResponse } from '@/types';

export async function replyToComment(
  comment: CommentReplyFormValues & { recipeId: string; commentId: string },
): Promise<ServerActionResponse> {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    await db.insert(commentsReplies).values({
      content: comment.reply,
      commentId: comment.commentId,
      authorId: user.id,
    });

    revalidatePath(ProjectUrls.commentsReceived);
    revalidatePath(ProjectUrls.recipe(comment.recipeId));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to reply to comment: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
