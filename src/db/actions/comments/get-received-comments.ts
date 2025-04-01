'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, asc, desc, eq, inArray } from 'drizzle-orm';

import { createCommentSqlFilters, handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { GetCommentsParams, comments, commentsReplies, recipes } from '@/db';
import { db } from '@/db/drizzle';

export async function getReceivedComments(params: GetCommentsParams) {
  const { limit, offset, sortBy, status, ...rest } = params;

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
        count: 0,
      };
    }

    const baseFilter = inArray(comments.recipeId, recipeIds);
    const additionalFilters = createCommentSqlFilters(rest);

    const countResult = await db.query.comments.findMany({
      where: and(baseFilter, ...additionalFilters),
      columns: {
        id: true,
      },
    });

    const totalCount = countResult.length;

    let orderByClause;
    switch (sortBy) {
      case 'oldest':
        orderByClause = [asc(comments.createdAt)];
        break;
      case 'highest':
        orderByClause = [desc(comments.rating)];
        break;
      case 'lowest':
        orderByClause = [asc(comments.rating)];
        break;
      case 'newest':
      default:
        orderByClause = [desc(comments.createdAt)];
    }

    const receivedComments = await db.query.comments.findMany({
      where: and(baseFilter, ...additionalFilters),
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
      orderBy: orderByClause,
      limit: limit || DATA_PER_PAGE,
      offset: offset || 0,
    });

    let filteredComments = receivedComments;
    if (status && status !== 'all') {
      filteredComments = receivedComments.filter((comment) => {
        const hasReplies = comment.replies.length > 0;
        return (status === 'replied' && hasReplies) || (status === 'unanswered' && !hasReplies);
      });
    }

    return {
      success: true,
      data: filteredComments,
      count: totalCount,
    };
  } catch (error) {
    handleError(error);
  }
}
