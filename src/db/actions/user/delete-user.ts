'use server';

import { eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { users } from '@/db';
import { db } from '@/db/drizzle';

export async function deleteUser(clerkId: string) {
  try {
    const [deletedUser] = await db.delete(users).where(eq(users.clerkId, clerkId)).returning();

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
