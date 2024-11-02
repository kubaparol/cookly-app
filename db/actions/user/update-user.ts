'use server';

import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { users } from '@/db';
import { db } from '@/db/drizzle';

import { UpdateUserParams } from './types';

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const [updatedUser] = await db
      .update(users)
      .set(user)
      .where(eq(users.clerkId, clerkId))
      .returning();

    if (!updatedUser) throw new Error('User update failed');

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
