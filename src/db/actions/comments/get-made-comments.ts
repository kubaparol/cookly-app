'use server';

import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { comments } from '@/db';
import { db } from '@/db/drizzle';

export async function getMadeComments() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const madeComments = await db.query.comments.findMany({
      where: eq(comments.authorId, user.id),
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
      data: madeComments,
    };
  } catch (error) {
    handleError(error);
  }
}
