'use server';

import { handleError } from '@/utils';

import { users } from '@/db';
import { db } from '@/db/drizzle';

import { CreateUserParams } from './types';

export async function createUser(user: CreateUserParams) {
  try {
    const [newUser] = await db.insert(users).values(user).returning();

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}
