'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, asc, desc, eq } from 'drizzle-orm';

import { createCommentSqlFilters, handleError } from '@/utils';

import { GetCommentsParams, comments } from '@/db';
import { db } from '@/db/drizzle';

export async function getMadeComments(params: GetCommentsParams) {
  const {
    // limit,
    // offset,
    sortBy,
    status,
    ...rest
  } = params;

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const baseFilter = eq(comments.authorId, user.id);

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

    const madeComments = await db.query.comments.findMany({
      where: and(baseFilter, ...additionalFilters),
      with: {
        recipe: {
          columns: {
            id: true,
            title: true,
            imageUrl: true,
          },
          with: {
            author: {
              columns: {
                firstName: true,
                lastName: true,
              },
            },
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
          columns: {
            id: true,
            content: true,
            createdAt: true,
          },
          with: {
            author: {
              columns: {
                firstName: true,
                lastName: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: orderByClause,
      // limit: limit || DATA_PER_PAGE,
      // offset: offset || 0,
    });

    let filteredComments = madeComments;
    if (status && status !== 'all') {
      filteredComments = madeComments.filter((comment) => {
        const hasReplies = comment.replies.length > 0;
        return (status === 'replied' && hasReplies) || (status === 'unanswered' && !hasReplies);
      });
    }

    return {
      count: totalCount,
      data: filteredComments,
    };
  } catch (error) {
    handleError(error);
  }
}
